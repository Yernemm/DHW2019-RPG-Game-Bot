const discord = require('discord.js');
const {GameUser} = require('./gameUser.js');
const {Prompt} = require('./prompt.js');
const {PrettyMsg} = require('./prettyMsg.js');
//const {createStory} = require('./createStory.js');
const jsonStory = require('./jsonToStory.js');

//createStory();
jsonStory.load('story.json');

async function react(messageReaction, user, data) {
  console.log(data)
  if (user.bot) return;
  var { message, emoji } = messageReaction;

  if (!GameUser.has(user.id)) return;

  var gameUser = GameUser.get(user.id);

  if (gameUser.message !== message.id) return;

  Prompt.removeOldReactions(message, emoji);

  var prompt = Prompt.get(gameUser.prompt);
  var result = await prompt.go(prompt.pick(emoji), message.channel, user);

  if (result === null) {  // Exit
    gameUser.exit();
    let promptData = {
      justText: true,
      text: "[bye-bye]"
    }
    message.channel.send(new PrettyMsg(promptData, user, data));
    gameUser.message = null; // Clear the player's message, player is not playing anymore
  } else {
    gameUser.message = result.msg.id;
    gameUser.prompt = result.next.id;
  }
};

async function start(message, data) {
  var gameUser = GameUser.retrieve(message.author.id);
  var msg = await Prompt.get(gameUser.prompt).display(message.channel, message.author, data);
  gameUser.message = msg.id;
  return Prompt.get(gameUser.prompt).formatted;
};

module.exports={
  react: react,
  start: start
};
