/**
 * @module hooks/Upload
 * @requires module:@feathersjs/authentication
 * @requires module:hooks/uploads/add-file-path
 * @requires module:hooks/uploads/remove-uri
 */

const { authenticate } = require('@feathersjs/authentication').hooks;
const addFilePath = require('../../hooks/uploads/add-file-path');
const removeURI = require('../../hooks/uploads/remove-uri');

/**
 * Uploads endpoint hooks
 * @author Daniel Kivi
 * @type Object
 */

module.exports = {
  before: {
    all: [], // Authenticate all endpoints
    find: [],
    get: [],
    create: [],
    update: [ authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [addFilePath(), removeURI()], // Add the file path to the file object, and remove the large URI
    get: [addFilePath(), removeURI()], // Add the file path to the file object, and remove the large URI
    create: [addFilePath(), removeURI()], // Add the file path to the file object, and remove the large URI
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
