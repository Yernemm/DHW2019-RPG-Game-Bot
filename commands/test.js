module.exports = {
  // METADATA
  desc: "A first testing command.",
  usage: "",
  cmdtype: "test",
  run: (data) => {
    // data contains: command, argsArr, argsTxt, client, message
    //e.g. to get arguments array, use data.argsArr.

    // COMMAND LOGIC
    let msg = "hewwo worl owo";

    data.message.channel.send(msg);
    return msg;
}};
