const {Prompt} = require('./prompt.js');
const emojis = require('./emojis.js');

const dir = './stories/';
const fs = require('fs');

var secretChoices = [];
const secretChance = 0.1;

function load(storyName){
    //Load the json file
    let storyPath = dir + storyName;
    let storyObj = JSON.parse(fs.readFileSync(storyPath, 'utf8'));

    //Load startup message.
    Prompt.save(-1, 'You have started the story.\nCurrently loaded story: ' + storyObj.name + '\n\nTo select your choices, react to the message with the emoji which corresponds to the option you want.\n\nOccasionally, you may come across a choice **which is written in bold.** These are special choices which only have a small chance of appearing. They will lead you to hidden story paths.', [
        Prompt.makeChoice(0, '✅', 'Start the story.')
      ]);

    //Iterate through all prompts in the file
    for(i = 0; i < storyObj.prompts.length; i++){
        //Generate the choices for this prompt.
        let choicesArray = [];

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
                choiceId, storyObj.prompts[choiceId].emoji, "**" + storyObj.prompts[choiceId].choiceText + "**"
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

module.exports = {
    load: load
};
