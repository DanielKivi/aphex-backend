/**
 * @module service/Sample
 * @requires module:@feathersjs/authentication
 * @requires module:hooks/populateUser
 * @requires module:hooks/populateFile
 * @requires module:hooks/saveFile
 *
 */

const { authenticate } = require('@feathersjs/authentication').hooks;
const populateUser = require('../../hooks/populate-user');
const populateFile = require('../../hooks/populate-file');
const saveFile = require('../../hooks/save-file');

/**
 * Service endpoint hooks
 * @author Daniel Kivi
 * @type {}
 */
module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
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
    create: [],
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
