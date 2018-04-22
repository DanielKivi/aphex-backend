/** @module hooks/users/populate-profile-picture */

/**
 * Adds the profile picture object to the user object
 *
 * @example <caption>Converts</caption>
 * {
        "email": "user@user.com",
        "_id": "5adcbd6dfa0fd46a6f4061ed"
  }
 * @example <caption>To</caption>
 *{
  "email": "user@user.com",
  "picture": {
    "id": "844dbbbb0f8f8fcef60180e26822e16876a0d0bc4dc18ab4a8f1f5551c78363c.png",
    "size": 45226,
    "path": "/uploads/844dbbbb0f8f8fcef60180e26822e16876a0d0bc4dc18ab4a8f1f5551c78363c.png"
  },
  "_id": "5adcbd6dfa0fd46a6f4061ed"
}
 * @async
 * @author Daniel Kivi
 * @returns {function(*)}
 */
module.exports = () => {
  return async context => {
    const {app, method, result, params} = context;

    // If we have an array of data from the find service, return the array.
    // Otherwise we make a single element array from the single object
    const messages = method === 'find' ? result.data : [result];

    // Loop through and call the fil endpoint with the file ID from the object. Then
    // we replace the fileId with the newly retrieved object
    await Promise.all(messages.map(async message => {
      message.picture = await app.service('uploads').get(message.picture, params);
      delete message.picture.uri;
    }));

    return context;
  };
};
