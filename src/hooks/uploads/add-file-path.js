/** @module hooks/uploads/add-file-path */

/**
 * Adds the file path for an uploaded file based on it's ID
 * @async
 * @author Daniel Kivi
 * @returns {function(*)}
 */

module.exports = () => {
  return async context => {
    const {method, result} = context;

    // If we have an array of data from the find service, return the array.
    // Otherwise we make a single element array from the single object
    const messages = method === 'find' ? result.data : [result];

    // Loop through and pad the id with the file path
    await Promise.all(messages.map(async message => {
      message.path = `/uploads/${message.id}`;
    }));

    return context;
  };
};
