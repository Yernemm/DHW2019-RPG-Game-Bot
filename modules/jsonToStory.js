var Prompt = require('./prompt.js');
var emojis = require('./emojis.js');
const dir = './stories/';
const fs = require('fs');
module.exports = { 
    load: function (storyName) {load(storyName)}
}

function load(storyName){
    //Load the json file
    let storyPath = dir + storyName;
    let storyObj = JSON.parse(fs.readFileSync(storyPath, 'utf8'));

    //Iterate through all prompts in the file
    for(i = 0; i < storyObj.prompts.length; i++){
        //Generate the choices for this prompt.
        let choicesArray = []

        //Only parse if the prompt has choices.
        if(storyObj.prompts[i].choices.length > 0){
            //Iterate through all the choices and add them to the choice array.
            storyObj.prompts[i].choices.forEach(choiceId => {
                choicesArray.push(Prompt.makeChoice(
                    choiceId, storyObj.prompts[choiceId].emoji, storyObj.prompts[choiceId].choiceText
                ))
            });
        }

        //Save the prompt to the list.
        Prompt.save(i, storyObj.prompts[i].text, choicesArray);
    }
}