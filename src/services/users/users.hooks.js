/**
 * @module hooks/User
 * @requires module:@feathersjs/authentication
 * @requires module:@feathersjs/authentication-local
 */

const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

/**
 * User endpoint hooks
 * @author Daniel Kivi
 * @type Object
 */

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ], // Only authenticate if we are querying or modifying users
    get: [ authenticate('jwt') ], // Only authenticate if we are querying or modifying users
    create: [ hashPassword() ], // Hash passwords
    update: [ hashPassword(),  authenticate('jwt') ], // Hash passwords, and authenticate
    patch: [ hashPassword(),  authenticate('jwt') ], // Hash passwords, and authenticate
    remove: [ authenticate('jwt') ] // Only authenticate if we are querying or modifying users TODO: Limit this to admins
  },

  after: {
    all: [
      protect('password') // Remove password before returning
    ],
    find: [],
    get: [],
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
