/**
 * @module hooks/Sample
 * @requires module:@feathersjs/authentication
 * @requires module:hooks/populate-user
 * @requires module:hooks/populate-file
 * @requires module:hooks/save-file
 *
 */

const { authenticate } = require('@feathersjs/authentication').hooks;
const populateUser = require('../../hooks/populate-user');
const populateFile = require('../../hooks/populate-file');
const populateComments = require('../../hooks/populate-comments');
const saveFile = require('../../hooks/save-file');
const querySample = require('../../hooks/query-sample');

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
      context => { // Attach the current user's id to the object
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
    find: [populateUser(), populateFile(), populateComments() ], // Replace the fileId with a file object
    get: [populateUser(), populateFile(), populateComments() ], // Replace the fileId with a file object
    create: [populateUser(), populateFile(), populateComments() ], // Replace the fileId with a file object
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
