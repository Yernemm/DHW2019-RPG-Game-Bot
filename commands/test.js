//METADATA
const desc = "haha yes"; //Short description of what the command does.
const usage = ""; //Any parameters required for command.
const cmdtype = "test"; //Type of command
//Command
exports.run = (command, argsArr, argsTxt, client) => {
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
  
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:
    message.channel.send("you're mom doo doo");



    //--------------------------------------------------------------------
   
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