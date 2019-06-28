const Discord = require('discord.js');
var client = require('../server.js').client;

class PrettyMsg extends Discord.RichEmbed {
  constructor(promptData, player){
    super();

    this
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL)
    .setAuthor(player.username, player.avatarURL);

    if(typeof promptData == 'string') this.setDescription(promptData.text)
    else{
      this
      .setDescription(promptData.prompt.text)
      .addBlankField()
      .setColor(promptData.prompt.color);
      promptData.choices.forEach(choice => this.addField(choice.emoji, choice.text, true));
    }
  }
}

module.exports = {
  PrettyMsg: PrettyMsg
};
