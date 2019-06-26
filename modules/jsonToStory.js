var Prompt = require('./prompt.js');
var emojis = require('./emojis.js');

const dir = './stories/';
const fs = require('fs');

var secretChoices = [];
const secretChance = 0.1;
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
                ).handle(function (thisChoice) {
                    shuffleSecrets();
                  })
                )
            });
        }

        //Handle the secret choice if it exists.
        if(storyObj.prompts[i].secretChoice != null){
            let choiceId = storyObj.prompts[i].secretChoice;
            var sec = Prompt.makeChoice(
                choiceId, storyObj.prompts[choiceId].emoji, storyObj.prompts[choiceId].choiceText
            ).handle(function (thisChoice) {
                shuffleSecrets();
              });
            secretChoices.push(sec);
            choicesArray.push(sec);
        }

        //Save the prompt to the list.
        Prompt.save(i, storyObj.prompts[i].text, choicesArray);
    }
}

//Random boolean. Chance is the chance to be true.
function rng(chance){
    return Math.random() <= chance;
}

//Randomly decide if each secret choice is diabled.
function shuffleSecrets(){
    if(secretChoices.length > 0){
        secretChoices.forEach(choice =>{
            if(rng(secretChance))
                choice.enable();
            else
                choice.disable();
        })
    }
}