/** @module model/Comment */

/**
 * The Mongoose model for the comment endpoint
 * @author Daniel Kivi
 * @param app Feathers application (configuration)
 * @returns {} Mongoose Model
 */
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const comment = new Schema({
    comment: { type: String, required: true },
    sampleId: { type: String, required: true },
    userId: { type: String, required: true}
  }, {
    timestamps: true
  });

  return mongooseClient.model('comment', comment);
};
