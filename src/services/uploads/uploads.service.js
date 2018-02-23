const hooks = require('./uploads.hooks');
const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const blobStorage = fs('./uploads');

module.exports = function() {
  const app = this;
  app.use('/uploads', blobService({ Model: blobStorage}));
  const service = app.service('uploads');
  service.hooks(hooks);
};
