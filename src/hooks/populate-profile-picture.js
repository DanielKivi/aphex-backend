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