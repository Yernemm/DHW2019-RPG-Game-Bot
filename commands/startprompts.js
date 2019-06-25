//-------------------------
//METADATA
var desc = "Starts the game."
var usage = ""
var cmdtype = "game"
//-------------------------

const { Prompt, Choice } = require('../modules/prompt.js');
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

    let choice6to2 = new Choice(2, emojis.b, 'Run away', true);
    let choice2to4 = new Choice(4, emojis.a, 'Proceed to your destination', true);
    let choice7to4 = new Choice(4, emojis.a, 'Proceed to your destination', true);
    let choice6to8 = new Choice(8, emojis.b, 'Lose the fight', true);
    let choice6to7 = new Choice(7, emojis.a, 'Win the fight', true);

    let scene4 = new Prompt(4, 'You reached the end, congratulations!', []).save();

    let scene7 = new Prompt(7, 'You defeated the bandit', [choice7to4]).save();

    let scene8 = new Prompt(8, 'You are defeated by the bandit, you are dead', []).save();

    let scene2 = new Prompt(2, 'You are traveling down a dirt road', [choice2to4]).save();

    let scene6 = new Prompt(6, 'See a bandit in front of you, he wants to fight.', [choice6to7, choice6to8]).save();



    let choice1to2 = new Choice(2, emojis.a, 'Take the road', true);
    let choice1to6 = new Choice(6, emojis.b, 'Go through the woods', true);
    let scene1 = new Prompt(1, 'You are leaving a town, you have the feeling you need to keep traveling.', [choice1to2], [choice1to6]).save();

    Prompt.save(1, 'You are leaving a town, you have the feeling you need to keep traveling.', [
      new Choice(2, emojis.a, 'Take the road'),
      new Choice(6, emojis.b, 'Go through the woods')
    ]);

    Prompt.save(2, 'You are traveling down a dirt road', [
      new Choice(4, emojis.a, 'Proceed to your destination')
    ]);

    Prompt.save();

    Prompt.save(6, 'See a bandit in front of you, he wants to fight.', [
      new Choice(7, emojis.a, 'Win the fight'),
      new Choice(8, emojis.b, 'Lose the fight')
    ]);

    Prompt.save(7, 'You defeated the bandit', [

    ]);



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
