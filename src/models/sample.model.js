/** @module model/Sample */

/**
 * The Mongoose model for the Sample endpoint
 * @author Daniel Kivi
 * @param app Feathers application (configuration)
 * @returns {} Mongoose Model
 */
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const sample = new Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true},
    fileId: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('sample', sample);
};
