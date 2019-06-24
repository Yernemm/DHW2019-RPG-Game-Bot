//METADATA
const desc = ""; //Short description of what the command does.
const usage = ""; //Any parameters required for command.
const cmdtype = ""; //Type of command
//Command
exports.run = (data) => {
    // data contains: command, argsArr, argsTxt, client, message
    //e.g. to get arguments array, use data.argsArr.
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    let msg = "" //Message to return to user (will be logged)
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:

    msg = "you're mom doo doo";


    //--------------------------------------------------------------------
   data.message.channel.send(msg);
   return msg;
}
exports.desc = () =>{
    return desc;
}
exports.use = () =>{
    return usage;
}
exports.cmdtype = () => {
    return cmdtype;
}