/**
 * @module service/Sample
 * @requires module:@feathersjs/authentication
 * @requires module:hooks/populate-user
 * @requires module:hooks/populate-file
 * @requires module:hooks/save-file
 *
 */

const { authenticate } = require('@feathersjs/authentication').hooks;
const populateUser = require('../../hooks/populate-user');
const populateFile = require('../../hooks/populate-file');
const saveFile = require('../../hooks/save-file');
const querySample = require('../../hooks/query-sample');

/**
 * Service endpoint hooks
 * @author Daniel Kivi
 * @type {}
 */
module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [querySample()],
    get: [],
    create: [
      context => {
        context.data.userId = context.params.user._id;
      },
      saveFile()
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populateUser(), populateFile()],
    get: [populateUser(), populateFile()],
    create: [populateUser(), populateFile()],
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
