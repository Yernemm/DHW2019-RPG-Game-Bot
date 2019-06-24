const discord = require("discord.js");
const client = new discord.client();

//This holds the token and some configurable data.
const config = require('./config.json'); 



//Command handler for messages.
client.on("message", message=> {
    if (message.author.bot) return; //Ignore messages from other bots and itself.
    if (message.channel.type != "text") return; //Only look in server text channels.
    if (message.content.indexOf(config.prefix) !== 0) return; //Only respond to commands which use the command prefix.

    //Split up the message into data to be used by commands.
    const argsArr = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = argsArr.shift().toLowerCase().replace(/[^a-zA-Z ]/g, "");
    const argsTxt = message.content.slice(config.prefix.length + command.length).trim();

    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(command,argsArr,argsTxt,client);
})
