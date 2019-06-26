var { GameUser } = require('./gameUser.js');
var { Prompt, Choice } = require('./prompt.js');
var emojis = require('./emojis.js');

Prompt.save(1, 'You are at a town, you have the feeling you need to keep traveling.', [
  Choice.new(2, emojis.a, 'Take the road'),
  Choice.new(5, emojis.b, 'Go through the woods'),
  Choice.new(1, emojis.c, 'Ponder nature for a bit')
]);

Prompt.save(2, 'You are traveling down a dirt road.', [
  Choice.new(4, emojis.a, 'Proceed to your destination')
]);

Prompt.save(4, 'You made it safely to your destination.\n**Congrats, You Won!**', []);

Prompt.save(5, 'Peering through the forest, you see a bandit.', [
  Choice.new(6, emojis.a, 'Attack the bandit'),
  Choice.new(1, emojis.b, 'Turn back').handle(function () {
    Prompt.get(1).choices[5].disable();
  })
]);

Prompt.save(6, 'You approach the bandit, he sees you and raises his club.', [
  Choice.new(7, emojis.a, 'Suprise the bandit by running at him head on'),
  Choice.new(8, emojis.b, 'Wait for the bandit to swing, and then strike'),
  Choice.new(9, emojis.c, 'Run! This was a bad idea!').handle(function () {
    Prompt.get(1).choices[5].disable();
  })
]);

Prompt.save(7, 'The bandit avoids your attack, and strikes you with his club knocking you out.\n**You Died! Game Over!**', []);

Prompt.save(8, 'The bandit swings his club. You avoid his attack, and quickly strike, knocking him out.', [
  Choice.new(1, emojis.a, 'Head back to town').handle(function () {
    Prompt.get(1).choices[5].disable();
  })
]);

Prompt.save(9, 'You narrowly escape the bandit, and manage to lose him in the forest.', [
  Choice.new(1, emojis.a, 'That was close')
]);

module.exports.react = async function react(messageReaction, user) {
  var { message, emoji } = messageReaction;

  if (!GameUser.has(user.id)) return;

  var gameUser = GameUser.get(user.id);

  if (gameUser.message !== message.id) return;

  var prompt = Prompt.get(gameUser.prompt);
  var { msg, next } = await prompt.go(prompt.pick(emoji));

  if (result === null) {
    gameUser.message = null; // Clear the player's message, player is not playing anymore
  } else {
    gameUser.message = msg.id;
    gameUser.prompt = next.id;
  }
};

module.exports.start = async function start(message) {
  var gameUser = GameUser.retrieve(message.author.id, message.id);
  await Prompt.get(gameUser.prompt).display(message.channel);
  return Prompt.get(gameUser.prompt).formatted;
};
