/** @module hooks/populateUser */

/**
 * Replaces userId in an object with it's corresponding user object
 * @example <caption>Converts</caption>
 * {
    "_id": "5a94ef533520ee25113bfb97",
    "name": "Test Sample",
    "userId": "5a7b5f1356af6a0b9d8cec79",
}
 * @example <caption>To</caption>
 *{
    "_id": "5a94ef533520ee25113bfb97",
    "name": "Test Sample",
    "user": {
        "_id": "5a7b5f1356af6a0b9d8cec79",
        "email": "user@user.com"
    }
}
 * @async
 * @author Daniel Kivi
 * @returns {function(*)} An asynchronous function
 */

module.exports = () => {
  return async context => {
    const {app, method, result, params} = context;
    const messages = method === 'find' ? result.data : [result];

    await Promise.all(messages.map(async message => {
      message.user = await app.service('users').get(message.userId, params);
      delete message.userId;
    }));

    return context;
  };
};
