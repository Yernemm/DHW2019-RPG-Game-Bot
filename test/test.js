var assert = require('assert');
var bot = require('../server.js');

describe('bot', ()=>{
  it('should be online', ()=>{
    assert.equal(bot, "online");
  });
});
