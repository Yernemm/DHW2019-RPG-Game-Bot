const Discord = require('discord.js');
var client = require('../server.js').client;
class PrettyMsg extends Discord.RichEmbed {
  constructor(promptData, player = null, data){
   super();
   if(player) this.setAuthor(player.username, player.avatarURL);

   this
   .setTimestamp()
   .setFooter(client.user.username, client.user.avatarURL);

   if(promptData.justText === true){     
    this.setDescription(promptData.text)
   }else{

    this
    .setDescription(promptData.prompt.text)
    .addBlankField()
    .setColor(promptData.prompt.color)
    if(promptData.choices.length > 0){
      promptData.choices.forEach(choice => this.addField(choice.emoji,choice.text, true))
    }
    
    
  }

  }
}

module.exports = {
  PrettyMsg: PrettyMsg
};
