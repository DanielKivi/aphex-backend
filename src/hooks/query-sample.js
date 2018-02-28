const ObjectID = require('mongodb').ObjectID;

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {


  return async context => {
    const {query = {}} = context.params;

    if (query._id) {
      query._id = new ObjectID(query._id);
    }

    if (query.name) {
      query.name = new RegExp(query.name, 'i');
    }

    context.params.query = query;

    return Promise.resolve(context);
  };
};
