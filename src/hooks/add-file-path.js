/** @module hooks/add-file-path */

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
    const {method, result} = context;
    const messages = method === 'find' ? result.data : [result];

    await Promise.all(messages.map(async message => {
      message.path = `/uploads/${message.id}`;
    }));

    return context;
  };
};
