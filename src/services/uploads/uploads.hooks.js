/**
 * @module hooks/Upload
 * @requires module:@feathersjs/authentication
 * @requires module:hooks/add-file-path
 */

const { authenticate } = require('@feathersjs/authentication').hooks;
const addFilePath = require('../../hooks/add-file-path');

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
    create: [authenticate('jwt')],
    update: [ authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [addFilePath()], // Add the file path to the file object
    get: [addFilePath()], // Add the file path to the file object
    create: [addFilePath()], // Add the file path to the file object
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
