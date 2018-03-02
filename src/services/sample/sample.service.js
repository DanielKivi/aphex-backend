/**
 * @module service/Sample
 * @requires module:feathers-mongoose
 * @requires module:model/Sample
 * @requires module:hooks/Sample
 */

const createService = require('feathers-mongoose');
const createModel = require('../../models/sample.model');
const hooks = require('./sample.hooks');

/**
 * Uses a configuration pattern to attach the sample service
 * @author Daniel Kivi
 * @param app Feathers application
 * @type {function(*)}
 */

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'sample',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sample', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('sample');

  service.hooks(hooks);
};
