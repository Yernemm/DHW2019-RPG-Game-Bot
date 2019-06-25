//-------------------------
//METADATA
var desc = "Starts the game."
var usage = ""
var cmdtype = "game"
//-------------------------

const prompts = require('../modules/prompt.js');
const emojis = require('../modules/emojis.js');

module.exports = {
  run: (data) => {
    // data contains: command, argsArr, argsTxt, client, message, config
    //e.g. to get arguments array, use data.argsArr.



    let msg = "" // Message to return to user (will be logged)
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
    // Command Logic
    // MAY NOT WORK, May need to be rewritten entirely
    let player = data.message.author;

    let scene4 = new prompts.prompt(4, 'You reached the end, congratulations!', null).save();
    let choice2to4 = new prompts.choice(4, emojis.a, 'Proceed to your destination', true);
    let choice7to4 = new prompts.choice(4, emojis.a, 'Proceed to your destination', true);
    let scene7 = new prompts.prompt(7, 'You defeated the bandit', [choice7to4]).save();
    let choice6to7 = new prompts.choice(7, emojis.a, 'Win the fight', true);
    let scene8 = new prompts.prompt(8, 'You are defeated by the bandit, you are dead', null).save();
    let choice6to8 = new prompts.choice(8, emojis.b, 'Lose the fight', true);
    let scene2 = new prompts.prompt(2, 'You are traveling down a dirt road', [choice2to4]).save();
    let choice6to2 = new prompts.choice(2, emojis.b, 'Run away', true);
    let scene6 = new prompts.prompt(6, 'See a bandit in front of you, he wants to fight.', [choice6to7, choice6to8]).save();
    let choice1to2 = new prompts.choice(2, emojis.a, 'Take the road', true);
    let choice1to6 = new prompts.choice(6, emojis.b, 'Go through the woods', true);
    let scene1 = new prompts.prompt(1, 'You are leaving a town, you have the feeling you need to keep traveling.', [choice1to2], [choice1to6]).save();

    scene1.display(data.message.channel);
    msg = scene1.formatted;

//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
    //data.message.channel.send(msg);
    return msg;
  },
  desc: desc,
  usage: usage,
  cmdtype: cmdtype
};
