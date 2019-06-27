module.exports = {
  // METADATA
  desc: "Starts the game.",
  usage: "",
  cmdtype: "game",
  run: (data) => {
    // data contains: command, argsArr, argsTxt, client, message, config
    //e.g. to get arguments array, use data.argsArr.

    // Command Logic
    let msg = "This command is not finished."; // Message to return to user (will be logged)


    data.message.channel.send(msg);
    return msg;
}};
