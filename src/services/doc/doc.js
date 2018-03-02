const docs = require('./config.js');

module.exports = function (app) {

  const docService = {
    async find(params) {
      return docs;
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
