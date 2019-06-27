var {GameUser} = require('./gameUser.js');
var Prompt = require('./prompt.js');
//var createStory = require('./createStory.js');
const jsonStory = require('./jsonToStory.js');

module.exports={
  react: react,
  start: start
}

//createStory();
jsonStory.load('story.json');

async function react(messageReaction, user) {
  if (user.bot) return;
  var { message, emoji } = messageReaction;

  if (!GameUser.has(user.id)) return;

  var gameUser = GameUser.get(user.id);

  if (gameUser.message !== message.id) return;

  var prompt = Prompt.get(gameUser.prompt);
  var result = await prompt.go(prompt.pick(emoji), message.channel);

  if (result === null) {
    gameUser.message = null; // Clear the player's message, player is not playing anymore
  } else {
    gameUser.message = result.msg.id;
    gameUser.prompt = result.next.id;
  }
};

async function start(message) {
  var gameUser = GameUser.retrieve(message.author.id);
  var msg = await Prompt.get(gameUser.prompt).display(message.channel);
  gameUser.message = msg.id;
  return Prompt.get(gameUser.prompt).formatted;
};
