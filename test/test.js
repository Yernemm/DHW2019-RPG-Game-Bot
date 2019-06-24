var assert = require('assert');
var bot = require('../server.js');

describe('bot', ()=>{
  it('should be loaded', ()=>{
    assert.equal(bot, "loaded");
  });
});
