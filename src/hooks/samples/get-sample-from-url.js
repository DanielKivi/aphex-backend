/** @module hooks/samples/get-sample-from-url **/

/**
 * Takes a sample's ID that has been passed through the URL and adds it to the request data
 * in a similar manner to what it would look like if it were passed through the body
 *
 * @example <caption>If given a url like </caption>
 * /sample/5ac6b4f8842df04025d2f9ad/comments
 * @example <caption>It will take out </caption>
 * 5ac6b4f8842df04025d2f9ad
 * @async
 * @author Daniel Kivi
 * @returns {function(*)}
 */
module.exports = function () {
  return async context => {
    if (context.data && context.params.route.sampleId) {
      context.data.sampleId = context.params.route.sampleId;
      context.params.query.sampleId = context.params.route.sampleId;
    }

    return Promise.resolve(context);
  };
};
