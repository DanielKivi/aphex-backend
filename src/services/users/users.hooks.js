/**
 * @module hooks/User
 * @requires module:@feathersjs/authentication
 * @requires module:@feathersjs/authentication-local
 * @requires module:hooks/users/save-profile-picture
 * @requires module:hooks/users/populate-profile-picture
 */

const { authenticate } = require('@feathersjs/authentication').hooks;
const saveProfilePicture = require('../../hooks/users/save-profile-picture');
const populateProfilePicture = require('../../hooks/users/populate-profile-picture');

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
    create: [ hashPassword(), saveProfilePicture(true) ], // Hash passwords
    update: [ hashPassword(),  authenticate('jwt') ], // Hash passwords, and authenticate
    patch: [
      hashPassword(),  authenticate('jwt'),
      context => {
        context.id = context.params.user._id;
      }, saveProfilePicture(false) ], // Hash passwords, and authenticate
    remove: [ authenticate('jwt') ] // Only authenticate if we are querying or modifying users TODO: Limit this to admins
  },

  after: {
    all: [
      protect('password') // Remove password before returning
    ],
    find: [populateProfilePicture()],
    get: [populateProfilePicture()],
    create: [populateProfilePicture()],
    update: [],
    patch: [populateProfilePicture()],
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
