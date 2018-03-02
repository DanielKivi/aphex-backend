/**
 * @module service/Upload
 * @requires module:feathers-blob
 * @requires module:fs-blob-store
 * @requires module:hooks/Upload
 */

const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const hooks = require('./uploads.hooks');

const blobStorage = fs('./uploads');


/**
 * Uses a configuration pattern to attach the upload service
 * @author Daniel Kivi
 * @param app Feathers application
 * @type {function(*)}
 */

module.exports = function() {
  const app = this;
  app.use('/uploads', blobService({ Model: blobStorage}));
  const service = app.service('uploads');
  service.hooks(hooks);
};
