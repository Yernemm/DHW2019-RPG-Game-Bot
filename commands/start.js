//-------------------------
//METADATA
var desc = "Starts the game."
var usage = ""
var cmdtype = "game"
//-------------------------

module.exports = {
  run: (data) => {
    // data contains: command, argsArr, argsTxt, client, message, config
    //e.g. to get arguments array, use data.argsArr.



    let msg = "" // Message to return to user (will be logged)
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
    // Command Logic

    msg = "This command is not finished."


//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------    
    data.message.channel.send(msg);
    return msg;
  },
  desc: desc,
  usage: usage,
  cmdtype: cmdtype
};

