//-------------------------
//METADATA
var desc = "Starts the game."
var usage = ""
var cmdtype = "game"
//-------------------------

const prompts = require('../modules/prompts.js');
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

    let scene4 = prompts.prompt.save(4, 'You reached the end, congratulations!', null);
    let choice2to4 = new prompts.choice(4, emojis.a, 'Proceed to your destination', true);
    let choice7to4 = new prompts.choice(4, emojis.a, 'Proceed to your destination', true);
    let scene7 = prompts.prompt.save(7, 'You defeated the bandit', [choice7to4]);
    let choice6to7 = new prompts.choice(7, emojis.a, 'Win the fight', true);
    let scene8 = prompts.prompt.save(8, 'You are defeated by the bandit, you are dead', null);
    let choice6to8 = new prompts.choice(8, emojis.b, 'Lose the fight', true);
    let scene2 = prompts.prompt.save(2, 'You are traveling down a dirt road', [choice2to4]);
    let choice6to2 = new prompts.choice(2, emojis.b, 'Run away', true);
    let scene6 = prompts.prompt.save(6, 'See a bandit in front of you, he wants to fight.', [choice6to7, choice6to8]);
    let choice1to2 = new prompts.choice(2, emojis.a, 'Take the road', true);
    let choice1to6 = new prompts.choice(6, emojis.b, 'Go through the woods', true);
    let scene1 = prompts.prompt.save(1, 'You are leaving a town, you have the feeling you need to keep traveling.', [choice1to2], [choice1to6]);

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
