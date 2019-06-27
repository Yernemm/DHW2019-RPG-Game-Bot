const assert = require('assert');
const bot = require('../server.js');

describe('bot', () => {
  it('should be loaded', () => {
    assert.equal(bot.status, "loaded");
  });
});
