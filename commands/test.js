exports = {
    run: function (data) {
        // data contains: command, argsArr, argsTxt, client, message
        //e.g. to get arguments array, use data.argsArr.
        //--------------------------------------------------------------------

        //--------------------------------------------------------------------
        let msg = "" //Message to return to user (will be logged)
        //--------------------------------------------------------------------

        //COMMAND LOGIC HERE:

        msg = "hewwo worl owo";


        //--------------------------------------------------------------------
        data.message.channel.send(msg);
        return msg;
    },
    desc: "A first testing command.",
    usage: "",
    cmdtype: "test"
};