const assert = require('assert');
const app = require('../../src/app');

describe('\'comment\' service', () => {
  it('registered the service', () => {
    const service = app.service('sample/:id/comment');

    assert.ok(service, 'Registered the service');
  });
});
