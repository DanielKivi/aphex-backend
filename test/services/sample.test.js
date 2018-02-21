const assert = require('assert');
const app = require('../../src/app');

describe('\'sample\' service', () => {
  it('registered the service', () => {
    const service = app.service('sample');

    assert.ok(service, 'Registered the service');
  });
});
