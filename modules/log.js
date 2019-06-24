const discord = require('discord.js');
module.exports = {
    log: function (data, output, channel) {
        console.log(generateLogText(data,output));
        sendDiscordLog(data, output, channel);
    },
}


function log(logChannel){

}

function generateLogText(data, output){
    return 
    `\`[${data.message.author.user.tag}] ${data.message.content}\`
    
    ${output}`
}

function generateConsoleText(data,output){
    return getTimeStamp() + ' ' + generateLogText(data,output);
}

function generateDiscordLogEmbed(data, output){
    return new discord.RichEmbed()
    .setTimestamp();
}

function sendDiscordLog(data, output, channel){
    channel.send(generateLogText(data, output), {generateDiscordLogEmbed(data, output)})
}

function getTimeStamp(){
    return  '[' + formDate() + ']';
  }
  

function formDate() {
    var d = new Date();
    return d.getUTCFullYear() + "/" + lZero((d.getUTCMonth() + 1), 2) + "/" + lZero(d.getUTCDate(), 2) + " " + lZero(d.getUTCHours(), 2) + ":" + lZero(d.getUTCMinutes(), 2) + ":" + lZero(d.getUTCSeconds(), 2);
}