module.exports.status = "init";
const discord = require("discord.js");
const fs = require('fs');
const client = new discord.Client();

//This holds the token and some configurable data.
const config = require('./config.json');

const log = require('./modules/log.js');

//TODO: Get the command handler to not crash when an invalid command is sent. Gonna need some try catch blocks with proper error handling around the commandfile require probably.
//Command handler for messages.
client.on("message", (message) => {
    if (message.author.bot) return; //Ignore messages from other bots and itself.
    if (!message.channel.guild) return; //Only look in server text channels.
    if (message.content.indexOf(config.prefix) !== 0) return; //Only respond to commands which use the command prefix.

    //Split up the message into data to be used by commands.
    const argsArr = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = argsArr.shift().toLowerCase().replace(/[^a-zA-Z ]/g, "");
    const argsTxt = message.content.slice(config.prefix.length + command.length).trim();

    const path = `./commands/${command}.js`;

    //checks if the command exists and is readable
    fs.access(path, fs.R_OK, (err) => {
        if (err) {
            //if the command doesn't exist or isn't readable send message to user that the command doesn't exist and console logs it
            message.channel.send("This command doesn't exist");
            console.log("The command \""+command+"\" doesn't exist");
            return
        }
        let commandFile = require(path);
        let data = {
            command: command,
            argsArr: argsArr,
            argsTxt: argsTxt,
            client: client,
            message: message,
            config: config
        };
        let output = commandFile.run(data);
        log.logCmd(data,output);
    })
});

// Handler function is in the game.js file
client.on('messageReactionAdd', require('./modules/game.js').react);

client.on('error', (error) => {
  console.error('The WebSocket encountered an error:', error);
});

client.on('ready', () => {
  log.logTxt(client, config, `Bot started on ${client.user.tag}\n    HEWWO I AM NAO ONLINE UWU`);
});

client.on('rateLimit', (info) => {
  console.log(`RateLimit: ${info.method.toUpperCase()} ${info.timeDifference}ms ${info.path}`);
});

client.login(config.token);
module.exports.status = "loaded";
