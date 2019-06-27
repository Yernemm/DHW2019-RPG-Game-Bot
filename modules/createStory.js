const {Prompt} = require('./prompt.js');
const emojis = require('./emojis.js');

function createStory() {
  Prompt.save(1, 'You are at a town, you have the feeling you need to keep traveling.', [
    Prompt.makeChoice(2, emojis.a, 'Take the road'),
    Prompt.makeChoice(5, emojis.b, 'Go through the woods'),
    Prompt.makeChoice(1, emojis.c, 'Ponder nature for a bit')
  ]);

  Prompt.save(2, 'You are traveling down a dirt road.', [
    Prompt.makeChoice(4, emojis.a, 'Proceed to your destination')
  ]);

  Prompt.save(4, 'You made it safely to your destination.\n**Congrats, You Won!**', []);

  Prompt.save(5, 'Peering through the forest, you see a bandit.', [
    Prompt.makeChoice(6, emojis.a, 'Attack the bandit'),
    Prompt.makeChoice(1, emojis.b, 'Turn back').handle(thisChoice => {
      Prompt.get(1).choices[1].disable();
    })
  ]);

  Prompt.save(6, 'You approach the bandit, he sees you and raises his club.', [
    Prompt.makeChoice(7, emojis.a, 'Suprise the bandit by running at him head on'),
    Prompt.makeChoice(8, emojis.b, 'Wait for the bandit to swing, and then strike'),
    Prompt.makeChoice(9, emojis.c, 'Run! This was a bad idea!').handle(thisChoice => {
      Prompt.get(1).choices[1].disable();
    })
  ]);

  Prompt.save(7, 'The bandit avoids your attack, and strikes you with his club knocking you out.\n**You Died! Game Over!**', []);

  Prompt.save(8, 'The bandit swings his club. You avoid his attack, and quickly strike, knocking him out.', [
    Prompt.makeChoice(1, emojis.a, 'Head back to town').handle(thisChoice => {
      Prompt.get(1).choices[1].disable();
    })
  ]);

  Prompt.save(9, 'You narrowly escape the bandit, and manage to lose him in the forest.', [
    Prompt.makeChoice(1, emojis.a, 'That was close')
  ]);
};

module.exports ={
  createStory: createStory
};
