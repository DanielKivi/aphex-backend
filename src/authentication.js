const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const jwtDecode = require('jwt-decode');

const addStrategyIfMissing = (strategy) => {
  return async context => {
    if(!context.data.hasOwnProperty('strategy')) context.data.strategy = strategy;
    return context;
  };
};

const addUserObject = () => {
  return async context => {
    const {app, method, result, params} = context;
    let token = jwtDecode(result.accessToken);
    result.user = await app.service('users').get(token.userId, params);
    return context;
  };
};

module.exports = function (app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    after: {
      create: [
        addUserObject()
      ]
    },
    before: {
      create: [
        addStrategyIfMissing('local'),
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  });
};
