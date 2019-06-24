exports = {
  run: function (data) {
    // data contains: command, argsArr, argsTxt, client, message, config
    //e.g. to get arguments array, use data.argsArr.


    
    let msg = "" // Message to return to user (will be logged)

    // Command Logic



    data.message.channel.send(msg);
    return msg;
  },
  desc: "",
  usage: "",
  cmdtype: ""
};

// This is functionally equivalent to the other template but much cleaner, what do you guys think?
// (The only difference is that desc, usage, and cmdtype are not functions and not global, you can use `this.desc`, `this.usage` or `this.cmdtype` in place of them)