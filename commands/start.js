const game = require('../modules/game.js');
//const {noChannelPerm} = require('../modules/log.js');

module.exports = {
  // METADATA
  desc: "Starts the game.",
  usage: "",
  cmdtype: "game",
  run: async data => {
    // data contains: command, argsArr, argsTxt, client, message, config
    //e.g. to get arguments array, use data.argsArr.

    // COMMAND LOGIC

    let msg = ""; // Message to return to user (will be logged)

    // MAY NOT WORK, May need to be rewritten entirely
    //let player = data.message.author;


    msg = await game.start(data.message);

    //var channel = data.message.channel;
    //channel.send(msg).catch(() => noChannelPerm(channel));
    return msg;
}};
