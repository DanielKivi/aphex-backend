// Initializes the `comment` service on path `/sample/:id/comment`
const createService = require('feathers-mongoose');
const createModel = require('../../models/comment.model');
const hooks = require('./comment.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    name: 'comment',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/comment', createService(options));
  app.use('/sample/:sampleId/comment', app.service('comment'));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('sample/:sampleId/comment');
  service.hooks(hooks);
};
