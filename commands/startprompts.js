//-------------------------
//METADATA
var desc = "Starts the game."
var usage = ""
var cmdtype = "game"
//-------------------------

const game = require('../modules/game.js');

module.exports = {
  run: async (data) => {
    // data contains: command, argsArr, argsTxt, client, message, config
    //e.g. to get arguments array, use data.argsArr.



    let msg = "" // Message to return to user (will be logged)
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
    // Command Logic
    // MAY NOT WORK, May need to be rewritten entirely
    //let player = data.message.author;

    
    msg = await await game.start(data.message);

//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
    //data.message.channel.send(msg);
    return msg;
  },
  desc: desc,
  usage: usage,
  cmdtype: cmdtype
};
