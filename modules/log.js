const discord = require('discord.js');
const {getClient, getConfig} = require('../server.js');

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
    getClient().channels.get(channel)
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
  console.error(getTimeStamp() + " ERROR: It would appear that I don't have permission to send to the log channel! ;-;");
}

function noChannelPerm(channel){
  logTxt("ERROR: I don't have permission to reply to you! D:", "`Channel:` " + channel);
}

function noMsgManagePerm(channel){
  logTxt("ERROR: Could I please have permission to manage messages? :)", "`Channel:` " + channel);
}

function noReactPerm(channel){
  logTxt("ERROR: I Don't have permission to react to messages! :/", "`Channel:` " + channel);
}

function logCmd(data, output){  //logCmd takes the command data and command output. Then logs it.
  console.log(generateConsoleText(data,output));
  sendDiscordLog(data, output, getConfig().logChannel);
}

function logTxt(text, extra = ''){  //extra is text that will be printed right after the code block
  console.log(getTimeStamp() + ' ' + text);
  getClient().channels.get(getConfig().logChannel)
  .send('```\n' + text + '\n```' + extra,  generateDiscordTimestampEmbed())
  .catch(noLogChannelPerm);
}

module.exports = {
    logCmd: logCmd,
    logTxt: logTxt,
    noChannelPerm: noChannelPerm,
    noMsgManagePerm: noMsgManagePerm,
    noReactPerm: noReactPerm
};
