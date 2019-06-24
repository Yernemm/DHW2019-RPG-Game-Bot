//-------------------------
//METADATA
var desc = "Starts the game."
var usage = ""
var cmdtype = "game"
//-------------------------

module.exports = {
  run: (data) => {
    // data contains: command, argsArr, argsTxt, client, message, config
    //e.g. to get arguments array, use data.argsArr.



    let msg = "" // Message to return to user (will be logged)
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
    // Command Logic

    msg = ""

    let sampleIntro = `\`[You wake up in an Imperial wagon driving down a snowy mountain pass. There are three other prisoners. You are seated and bound; so are the others. The one dressed in finery is gagged.]\`

**[Ralof]:** *Hey, you. You're finally awake. You were trying to cross the border, right? Walked right into that Imperial ambush, same as us, and that thief over there.*`
   data.message.channel.send(sampleIntro).then(prompt=>{
    prompt.react('🔪')
    .then(() => prompt.react('👄'))
    .then(() => prompt.react('🏃'))
    .then(() => prompt.react('❌'))
    .catch(() => console.error('One of the emojis failed to react.'));
  }).catch(() => console.error('Text failed to send...'));

//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------    
    data.message.channel.send(msg);
    return msg;
  },
  desc: desc,
  usage: usage,
  cmdtype: cmdtype
};

