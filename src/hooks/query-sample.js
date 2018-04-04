/** @module hooks/querySample
 *  @requires module:mongodb
 **/

const ObjectID = require('mongodb').ObjectID;

/**
 * Formats the data to match the datatypes stored in MongoDB. This is necessary for querying that database
 * I also use it to turn the name into a regular expression, so we kind find any name that contains the search query. Not only names that equal the query.
 * @async
 * @author Daniel Kivi
 * @returns {function(*)}
 */

module.exports = function () {
  return async context => {

    // Pull out the query parameters
    const {query = {}} = context.params;

    // If we are querying on the ID, then make the ID a MongoDB ObjectID.
    if (query._id) {
      query._id = new ObjectID(query._id);
    }

    // Wrap the name query in a regular expression to allow for a "fuzzy" search
    if (query.name) {
      query.name = new RegExp(query.name, 'i');
    }

    if (query.user) {
      query.userId = new ObjectID(query.user);
      delete query.user;
    }

    context.params.query = query;
    return Promise.resolve(context);
  };
};
