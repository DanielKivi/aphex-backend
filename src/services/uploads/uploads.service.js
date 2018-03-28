/**
 * @module service/Upload
 * @requires module:feathers-blob
 * @requires module:fs-blob-store
 * @requires module:hooks/Upload
 */

const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const hooks = require('./uploads.hooks');
const mime = require('mime-types');

const blobStorage = fs('./uploads');

// TODO: Make work with all filetypes
function returnMP3(req, res, next) {
  if(res.hook.method !== 'get')
  {
    next();
  } else {
    let filePath = res.data.path;
    let mimetype = mime.lookup(filePath);

    res.type(mimetype);
    res.download('./' + filePath);
  }
}

/**
 * Uses a configuration pattern to attach the upload service
 * @author Daniel Kivi
 * @param app Feathers application
 * @type {function(*)}
 */

module.exports = function() {
  const app = this;
  app.use('/uploads', blobService({ Model: blobStorage}), returnMP3);
  const service = app.service('uploads');
  service.hooks(hooks);
};
