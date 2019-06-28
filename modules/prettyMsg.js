const Discord = require('discord.js');
const {client} = require('../server.js');

class PrettyMsg extends Discord.RichEmbed {
  constructor(message, player){ // message can either be a string or prompt data, acquired from the displayObj method of a Prompt instance
    super();

    this
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL)
    .setAuthor(player.username, player.avatarURL);

    if(typeof message == 'string') this.setDescription(message)
    else{
      this
      .setDescription(message.prompt.text)
      .addBlankField()
      .setColor(message.prompt.color);
      message.choices.forEach(choice => this.addField(choice.emoji, choice.text, true));
    }
  }
}

module.exports = {
  PrettyMsg: PrettyMsg
};
