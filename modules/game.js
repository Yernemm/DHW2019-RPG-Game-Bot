var { GameUser, Player, userList } = require('./GameUser.js');
var { Prompt, Choice, promptList } = require('./Prompt.js');
var emojiList = require('./emojis.js');

module.exports.onReact = function onReact(messageReaction, user) {
  var { message, emoji } = messageReaction;
};