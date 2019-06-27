const Discord = require('discord.js');

class PrettyMsg extends Discord.RichEmbed {
  constructor(player, message){
    super({
      title: message
    });
  }
}

module.exports = {
  PrettyMsg: PrettyMsg
};
