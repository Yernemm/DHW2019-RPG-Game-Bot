const {noChannelPerm} = require('../modules/log.js');

module.exports = {
  // METADATA
  desc: "",
  usage: "",
  cmdtype: "",
  run: data => {
    // data contains: command, argsArr, argsTxt, client, message, config
    //e.g. to get arguments array, use data.argsArr.

    // COMMAND LOGIC
    let msg = ""; // Message to return to user (will be logged)

    data.message.channel.send(msg).catch(noChannelPerm);
    return msg;
}};
