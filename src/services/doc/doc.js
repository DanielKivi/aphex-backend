/** @module service/Doc
 *  @requires service/Doc-config
 * */



const docs = require('./config.js');

/**
 * Creates an endpoint to return the configuration needed by Swagger-UI
 * @author Daniel Kivi
 * @param app Feathers application
 * @type {function(*)}
 */

module.exports = function (app) {

  const docService = {
    async find(params) {
      return docs; // Simply return the JSON configuration
    },
    async get(id, params) {},
    async create(data, params) {},
    async update(id, data, params) {},
    async patch(id, data, params) {},
    async remove(id, params) {}
  };

  app.use('/docs', docService);
  app.service('docs');

};
