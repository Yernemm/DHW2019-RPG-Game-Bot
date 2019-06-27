const Discord = require('discord.js');

class PrettyMsg extends Discord.RichEmbed {
  constructor(message, player = null){
    super({title: message});
    if(player){
      this.setImage(player.avatarURL);
    }
  }
}

module.exports = {
  PrettyMsg: PrettyMsg
};
