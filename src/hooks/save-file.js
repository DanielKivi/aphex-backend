/** @module hooks/save-file */

/**
 * Saves the uri to a file in the specified folder.
 * Takes the 'uri' (which should be a data-url) and saves it to the 'upload' folder
 * @async
 * @author Daniel Kivi
 * @returns {function(*)}
 */

module.exports = () => {
  return async context => {
    const {app, data, params} = context;
    const file = await app.service('uploads').create({uri: data.uri}, params);
    data.fileId = file.id;
    delete data.uri;
    return context;
  };
};
