module.exports={
  status: "init",
  getClient: () => client,
  getConfig: () => config
};

const discord = require("discord.js");
const fs = require('fs');
const config = require('./config.json');  //This holds the token and some configurable data.
const {logCmd, logTxt, noChannelPerm, getTimeStamp} = require('./modules/log.js');
const game = require('./modules/game.js');
const client = new discord.Client();

//Command handler for messages.
client.on("message", message => {
    var channel = message.channel;

    if (message.author.bot) return; //Ignore messages from other bots and itself.
    if (!channel.guild) return; //Only look in server text channels.
    if (message.content.indexOf(config.prefix) !== 0) return; //Only respond to commands which use the command prefix.

    //Split up the message into data to be used by commands.
    const argsArr = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = argsArr.shift().toLowerCase().replace(/[^a-zA-Z ]/g, "");
    const argsTxt = message.content.slice(config.prefix.length + command.length).trim();
    if(command.length < 2) return; // Ignore commands of 1 or no letters

    const path = `./commands/${command}.js`;

    //checks if the command exists and is readable
    fs.access(path, fs.R_OK, err => {
        if (err) {
            //if the command doesn't exist or isn't readable send message to user that the command doesn't exist and console logs it
            //  /\ no don't
            //channel.send("This command doesn't exist").catch(() => noChannelPerm(channel));
            //console.log(getTimeStamp() + " The command \""+command+"\" doesn't exist");
            return
        }
        const commandFile = require(path);
        let data = {
            command: command,
            argsArr: argsArr,
            argsTxt: argsTxt,
            client: client,
            message: message,
            config: config
        };
        let output = commandFile.run(data);
        logCmd(data,output);
    })
});

// Handler function is in the game.js file
client.on('messageReactionAdd', ( (messageReaction, user) => {
  game.react(messageReaction, user);
}));

client.on('error', error => {
  console.error(getTimeStamp() + ' The WebSocket encountered an error:', error);
});

client.on('ready', () => {
  logTxt(`Bot started on ${client.user.tag}\n    HEWWO I AM NAO ONLINE UWU`);
  client.user.setActivity("say ;start", {type: "LISTENING"});
});

client.on('rateLimit', info => {
  console.log(`${getTimeStamp()} RateLimit: ${info.method.toUpperCase()} ${info.timeDifference}ms ${info.path}`);
});

client.login(config.token);

module.exports.status = "loaded";
