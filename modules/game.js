var { GameUser, Player, userList } = require('./gameUser.js');
var { Prompt, Choice, promptList } = require('./prompt.js');
var emojiList = require('./emojis.js');

module.exports.onReact = function onReact(messageReaction, user) {
  var { message, emoji } = messageReaction;
};