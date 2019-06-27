module.exports = {
  // METADATA
  desc: "Starts the game.",
  usage: "",
  cmdtype: "game",
  run: data => {
    // data contains: command, argsArr, argsTxt, client, message, config
    //e.g. to get arguments array, use data.argsArr.

    // COMMAND LOGIC
    let msg = ""; // Message to return to user (will be logged)

    let player = data.message.author;
    let sampleIntro = `[You wake up in an Imperial wagon driving down a snowy mountain pass. There are three other prisoners. You are seated and bound; so are the others. The one dressed in finery is gagged.]

**[Ralof]:** *Hey, you. You're finally awake. You were trying to cross the border, right? Walked right into that Imperial ambush, same as us, and that thief over there.*`;
    data.message.channel.send(sampleIntro).then(prompt => {
      prompt.react('🔪')
      .then(() => prompt.react('👄'))
      .then(() => prompt.react('🏃'))
      .then(() => prompt.react('❌'))
      .catch(() => console.error('One of the emojis failed to react.'));

      const filter = (reaction, user) => {
        return ['🔪', '👄', '🏃', '❌'].includes(reaction.emoji.name) && user.id === player.id;
      };

      prompt.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(collected => {
        const re = collected.first();
        let response = "";
        switch(re.emoji.name){
          case '🔪':
          response = "You tried stabbing the other prisoners, only to find out you have no weapon! The guards realise what you tried to do and kill you on the spot by feeding you to the wagon horses.";
          break;
          case '👄':
          response = "You tried to answer Ralof but since you are a voiceless protagonist, you only manage to slightly open your mouth without a single sound. Ralof takes offense to this and shoves his entire arm down your throat, killing you from the inside.";
          break;
          case '🏃':
          response = "You try to run from the encounter but you can't run away from a trainer battle! Ralof deploys his shiny Alduin, which then proceedes to devour you. You fainted.";
          break;
          case '❌':
          response = "Well, you try to exit the game. But since the game is now closed, your hypothetical character no longer exists. So in a way, you still die? I guess?";
          break;
        }
        data.message.channel.send(response);
      })

    }).catch(() => console.error('Text failed to send.'));

    data.message.channel.send(msg);
    return msg;
}};
