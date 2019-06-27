const game = require('../modules/game.js');

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


    msg = await game.start(data.message, data);

    //data.message.channel.send(msg);
    return msg;
}};
