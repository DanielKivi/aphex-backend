/** @module hooks/uploads/populate-file */

/**
 * Replaces fileId in an object with it's corresponding file object
 *
 * @example <caption>Converts</caption>
 * {
    "_id": "5a94ef533520ee25113bfb97",
    "name": "Test Sample",
    "fileId": "6454364d8facd7a88e627e4c4b11b032d2f83af8f7f9329ffc2b7a5c879dc838.gif",
    "user": {
        "_id": "5a7b5f1356af6a0b9d8cec79",
        "email": "user@user.com"
    }
}
 * @example <caption>To</caption>
 *{
    "_id": "5a94ef533520ee25113bfb97",
    "name": "Test Sample",
    "user": {
        "_id": "5a7b5f1356af6a0b9d8cec79",
        "email": "user@user.com"
    },
    "file": {
        "id": "6454364d8facd7a88e627e4c4b11b032d2f83af8f7f9329ffc2b7a5c879dc838.gif",
        "size": 1156
    }
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
      message.file = await app.service('uploads').get(message.fileId, params);
      delete message.file.uri;
      delete message.fileId;
    }));

    return context;
  };
};
