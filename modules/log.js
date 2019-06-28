const discord = require('discord.js');

function generateLogText(data, output){
    return `\`[${data.message.author.tag}]: ${data.message.content}\`\n\`[Response]:${output}\``;
}

function generateConsoleText(data,output){
    return getTimeStamp() + ' ' + generateLogText(data,output);
}
//Two functions below are currently identical but they will be expanded upon in the future. Do not delete.
function generateDiscordLogEmbed(data, output){
    return new discord.RichEmbed()
    .setTimestamp();
}

function generateDiscordTimestampEmbed(){
    return new discord.RichEmbed()
    .setTimestamp();
}

function sendDiscordLog(data, output, channel){
    data.client.channels.get(channel)
    .send(generateLogText(data, output), generateDiscordLogEmbed(data, output))
    .catch(noLogChannelPerm);
}

function getTimeStamp(){
    return  '[' + formDate() + ']';
  }


function formDate() {
    var d = new Date();
    return d.getUTCFullYear() + "/" + lZero((d.getUTCMonth() + 1), 2) + "/" + lZero(d.getUTCDate(), 2) + " " + lZero(d.getUTCHours(), 2) + ":" + lZero(d.getUTCMinutes(), 2) + ":" + lZero(d.getUTCSeconds(), 2);
}

function lZero(num, digits) {
    var zeroes = "0".repeat(digits);
    return (zeroes + num).slice(- digits);
}

function noLogChannelPerm(){
  console.log("ERROR: It would appear that I don't have permission to send to the log channel! ;-;");
}

module.exports = {
    //logCmd takes the command data and command output. Then logs it.
    logCmd: (data, output) => {
        console.log(generateConsoleText(data,output));
        sendDiscordLog(data, output, data.config.logChannel);
    },
    //logTxt needs the client and config file to log any string.
    logTxt: text => {
        const {client, config} = require('../server.js');
        console.log(getTimeStamp() + ' ' + text);
        client.channels.get(config.logChannel)
        .send('```\n' + text + '\n```',  generateDiscordTimestampEmbed())
        .catch(noLogChannelPerm);
    },
    noChannelPerm: () => console.log("ERROR: I don't have permission to reply to you in this channel! D:")
};
