/** @module hooks/users/populate-user */

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

    // If we have an array of data from the find service, return the array.
    // Otherwise we make a single element array from the single object
    const messages = method === 'find' ? result.data : [result];

    // Loop through and call the user endpoint with the user ID from the object. Then
    // we replace the userId with the newly retrieved object
    await Promise.all(messages.map(async message => {
      message.user = await app.service('users').get(message.userId, params);
      delete message.userId;
    }));

    return context;
  };
};
