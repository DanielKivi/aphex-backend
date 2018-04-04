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

module.exports = {
  before: {
    all: [ authenticate('jwt'), mapSampleIdToData() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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
