/** @module hooks/uploads/remove-uri */

/**
 * Since a URI can be a string up to 10MB in size, we remove it from the response.
 * We send back the file path with the same data anyways, so it would be redundant
 * @async
 * @author Daniel Kivi
 * @returns {function(*)}
 */

module.exports = () => {
  return async context => {
    const {data, result} = context;
    delete result.uri;
    return context;
  };
};
