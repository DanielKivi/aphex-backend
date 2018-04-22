/**
 * @module hooks/Sample
 * @requires module:@feathersjs/authentication
 * @requires module:hooks/users/populate-user
 * @requires module:hooks/uploads/populate-file
 * @requires module:hooks/uploads/save-file
 *
 */

const { authenticate } = require('@feathersjs/authentication').hooks;
const populateUser = require('../../hooks/users/populate-user');
const populateFile = require('../../hooks/uploads/populate-file');
const populateComments = require('../../hooks/comments/populate-comments');
const saveFile = require('../../hooks/uploads/save-file');
const querySample = require('../../hooks/samples/query-sample');

/**
 * Service endpoint hooks
 * @author Daniel Kivi
 * @type Object
 */
module.exports = {
  before: {
    all: [ authenticate('jwt') ], // Authenticate on all endpoints
    find: [querySample()],
    get: [],
    create: [
      context => { // Attach some defaults to a user if they are not provided
        context.data.userId = context.params.user._id;
        if(!context.data.description) context.data.description = 'No description';
        if(!context.data.type) context.data.type = 'sample';
      },
      saveFile() // Send the data url for saving
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populateUser(), populateFile(), populateComments() ], // Attaches relevant objects
    get: [populateUser(), populateFile(), populateComments() ], // Attaches relevant objects
    create: [populateUser(), populateFile(), populateComments() ], // Attaches relevant objects
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
