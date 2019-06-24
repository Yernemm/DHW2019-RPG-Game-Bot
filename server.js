const discord = require("discord.js");
const client = new discord.Client();

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
    let data = {
        command: command,
        argsArr: argsArr,
        argsTxt: argsTxt,
        client: client,
        message: message};
    let output = commandFile.run(data);
    let logText = message.content + "   |   " + output
    console.log(logText); //Simple temporary command logging.
    client.channels.get(config.logChannel).send(logText);
})

client.on('error', error => {
    console.error('The WebSocket encountered an error:', error);
  });

  client.on('ready', () => {
    console.log(`Bot started on ${client.user.tag}`);
    client.channels.get(config.logChannel).send("HEWWO I AM NOW ONLINE UWU");
  });

  client.login(config.token);