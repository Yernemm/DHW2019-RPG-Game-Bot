//METADATA
const desc = ""; //Short description of what the command does.
const usage = ""; //Any parameters required for command.
const cmdtype = ""; //Type of command
//Command
exports.run = (command, argsArr, argsTxt, client) => {
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    let msg = "" //Message to return to user (will be logged)
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:




    //--------------------------------------------------------------------
   message.channel.send(msg);
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