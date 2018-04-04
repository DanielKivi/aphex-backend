const { authenticate } = require('@feathersjs/authentication').hooks;

const mapSampleIdToData = ()  => {
  return async context => {
    if (context.data && context.params.route.sampleId) {
      context.data.sampleId = context.params.route.sampleId;
      context.params.query.sampleId = context.params.route.sampleId;
    }

    return Promise.resolve(context);
  };
};

const populateUser = () => {
  return async context => {
    const {app, method, result, params} = context;

    const messages = result;

    await Promise.all(messages.map(async message => {
      message.user = await app.service('users').get(message.userId, params);
      delete message.userId;
    }));

    return context;
  };
};

module.exports = {
  before: {
    all: [ authenticate('jwt'), mapSampleIdToData() ],
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
    find: [populateUser()],
    get: [populateUser()],
    create: [populateUser()],
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
