const users = require('./users/users.service.js');
const sample = require('./sample/sample.service.js');
const uploads = require('./uploads/uploads.service.js');
const docs = require('./doc/doc');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(sample);
  app.configure(uploads);
  app.configure(docs);
};