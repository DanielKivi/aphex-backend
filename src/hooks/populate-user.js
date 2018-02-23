module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const {app, method, result, params} = context;
    const messages = method === 'find' ? result.data : [result];

    await Promise.all(messages.map(async message => {
      const user = await app.service('users').get(message.userId, params);
      message.user = user;
      delete message.userId;
    }));

    return context;
  };
};
