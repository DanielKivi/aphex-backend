/**
 * @module service/User
 * @requires module:feathers-mongodb
 * @requires module:hooks/User
 */

const createService = require('feathers-mongodb');
const hooks = require('./users.hooks');

/**
 * Uses a configuration pattern to attach the users service
 * @author Daniel Kivi
 * @param app Feathers application
 * @type {function(*)}
 */
module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  app.use('/users', createService(options));
  const service = app.service('users');

  mongoClient.then(db => {
    service.Model = db.collection('users');
  });

  service.hooks(hooks);
};
