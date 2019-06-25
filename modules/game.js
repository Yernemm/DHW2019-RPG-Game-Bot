var { GameUser, Player, userList } = require('./gameUser.js');
var { Prompt, Choice, promptList } = require('./prompt.js');
var emojiList = require('./emojis.js');

Prompt.save(1, 'You are at a town, you have the feeling you need to keep traveling.', [
  new Choice(2, emojis.a, 'Take the road'),
  new Choice(5, emojis.b, 'Go through the woods'),
  new Choice(1, emojis.c, 'Ponder nature for a bit')
]);

Prompt.save(2, 'You are traveling down a dirt road.', [
  new Choice(4, emojis.a, 'Proceed to your destination')
]);

Prompt.save(4, 'You made it safely to your destination.\n**Congrats, You Won!**', []);

Prompt.save(5, 'Peering through the forest, you see a bandit.', [
  new Choice(6, emojis.a, 'Attack the bandit'),
  new Choice(1, emojis.b, 'Turn back')
]);

Prompt.save(6, 'You approach the bandit, he sees you and raises his club.', [
  new Choice(7, emojis.a, 'Suprise the bandit by running at him head on'),
  new Choice(8, emojis.b, 'Wait for the bandit to swing, and then strike'),
  new Choice(9, emojis.c, 'Run! This was a bad idea!')
]);

Prompt.save(7, 'The bandit avoids your attack, and strikes you with his club knocking you out.\n**You Died! Game Over!**', []);

Prompt.save(8, 'The bandit swings his club. You avoid his attack, and quickly strike, knocking him out.', [
  new Choice(1, emojis.a, 'Head back to town')
]);

Prompt.save(9, 'You narrowly escape the bandit, and manage to lose him in the forest.', [
  new Choice(1, emojis.a, 'That was close')
]);

module.exports.onReact = function onReact(messageReaction, user) {
  var { message, emoji } = messageReaction;
};
