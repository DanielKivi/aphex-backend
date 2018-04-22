/**
 * @module hooks/Comment
 * @requires module:@feathersjs/authentication
 * @requires module:hooks/samples/get-sample-from-url
 */

const { authenticate } = require('@feathersjs/authentication').hooks;
const getSampleFromURL = require('../../hooks/samples/get-sample-from-url');

/**
 * Since we manually inject the user into this object, we run into some difficulties
 * using the normal hyrator. This would be something I would consider a bug and a TODO
 * @author Daniel Kivi
 * @type Object
 */
const populateUser = () => {
  return async context => {
    const {app, method, result, params} = context;

    const messages = (Array.isArray(result)) ? result : [result];

    await Promise.all(messages.map(async message => {
      message.user = await app.service('users').get(message.userId, params);
      delete message.userId;
    }));

    return context;
  };
};

module.exports = {
  before: {
    all: [ authenticate('jwt'), getSampleFromURL() ], // Attaches the sample id from the URL
    find: [],
    get: [],
    create: [
      context => { // Attach the current user's id to the object
        context.data.userId = context.params.user._id;
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populateUser()], // Attach the user object of whoever made the comment
    get: [populateUser()], // Attach the user object of whoever made the comment
    create: [populateUser()], // Attach the user object of whoever made the comment
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
