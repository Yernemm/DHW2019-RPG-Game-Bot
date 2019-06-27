const Discord = require('discord.js');

class PrettyMsg extends Discord.RichEmbed {
  constructor(message, player = null){
    super({description: message});
    if(player) this.setAuthor(player.username, player.avatarURL);
  }
}

module.exports = {
  PrettyMsg: PrettyMsg
};
