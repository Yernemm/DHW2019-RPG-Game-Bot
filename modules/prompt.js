const config = require('../config.json');
const {logTxt} = require('./log.js');
const {client}= require('../server.js');
const {Collection} = require('discord.js');
const {exit} = require('./emojis.js');

module.exports = {
  Prompt: Prompt
}

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

class Choice {
  /**
   * Creates a new Choice instance.
   * @param {Prompt} dest The destination Prompt
   * @param {String} emoji The reaction emoji in unicode string form
   * @param {String|Function} text The flavor text for this Choice. If a function, the property will become a getter
   * @param {Boolean|Function} enabled Whether this Choice should be shown or not (defaults to `true`)
   */
  constructor(dest, emoji, text, enabled = true) {
    this.dest = dest;
    this.emoji = emoji;
    if (isFunction(text)) {
      Object.defineProperty(this, 'text', {
        configurable: true,
        enumerable: true,
        get: text
      });
    } else {
      Object.defineProperty(this, 'text', {
        configurable: true,
        enumerable: true,
        value: text,
        writable: true
      });
    }
    if (isFunction(text)) {
      Object.defineProperty(this, 'enabled', {
        configurable: true,
        enumerable: true,
        get: enabled
      });
    } else {
      Object.defineProperty(this, 'enabled', {
        configurable: true,
        enumerable: true,
        value: enabled,
        writable: true
      });
    }
    this.parent = null;
  }

  /**
   * Gets the string form of the Choice.
   * @type {String}
   */
  get formatted() {
    return this.emoji + ': ' + this.text;
  }

  /**
   * Index of the Choice in the parent Prompt's Choice array
   * @type {Number}
   */
  get index() {
    return this.parent.choices.indexOf(this);
  }

  /**
   * Sets the Choice's `.parent` property and returns the Choice object.
   * @returns {Choice} The Choice
   */
  assign(parent) {
    this.parent = parent;
    return this;
  }

  /**
   * Adds a function to be executed when the choice is picked
   * @param {Function} fn The function
   */
  handle(fn) {
    this.onChoice = fn;
    return this;
  }

  /**
   * Disables the choice, making it not show up in dialogue
   */
  disable() {
    try {
      this.enabled = false;
    } catch (err) {
      /*Object.defineProperty(this, 'enabled', {
        configurable: true,
        enumerable: true,
        value: true,
        writable: true
      });*/
      // Uncomment that if you want force-disable functionality
    }
    return this;
  }

  /**
   * Enables the Choice, making it show up in dialogue again
   */
  enable() {
    try {
      this.enabled = true;
    } catch (err) {
      /*Object.defineProperty(this, 'enabled', {
        configurable: true,
        enumerable: true,
        value: false,
        writable: true
      });*/
      // Uncomment that if you want force-enable functionality
    }
    return this;
  }
}

class Prompt {
  /**
   * Creates a new Prompt instance, attaches it to `Prompt.list`, and returns it.
   * @param {*} id The ID of this Prompt
   * @param {String} text The flavor text for this Prompt
   * @param {Array<Choice>} choices An array of Choice objects to be attached to this Prompt
   * @returns {Prompt} The Prompt
   */
  static save(id, text, choices) {
    var saved = new Prompt(id, text, choices);
    Prompt.registry.set(id, saved);
    return Prompt.registry.get(id);
  }

  /**
   * Creates a new Choice instance, and returns it. This should be used instead of `new Choice` as you can call `.handle` on it without worrying about it breaking
   * @param {Prompt} dest The destination Prompt
   * @param {String} emoji The reaction emoji in unicode string form
   * @param {String|Function} text The flavor text for this Choice. If a function, the property will become a getter
   * @param {Boolean|Function} enabled Whether this Choice should be shown or not (defaults to `true`)
   * @returns {Choice} The Choice
   */
  static makeChoice(dest, emoji, text, enabled = true) {
    return new Choice(dest, emoji, text, enabled);
  }

  /**
   * Creates a new Prompt instance.
   * @param {*} id The ID of this Prompt
   * @param {String|Function} text The flavor text for this Prompt. If a function, the property will become a getter
   * @param {Array<Choice>} choices An array of Choice objects to be attached to this Prompt
   */
  constructor(id, text, choices) {
    this.id = id;
    if (isFunction(text)) {
      Object.defineProperty(this, 'text', {
        configurable: true,
        enumerable: true,
        get: text
      });
    } else {
      Object.defineProperty(this, 'text', {
        configurable: true,
        enumerable: true,
        value: text,
        writable: true
      });
    }
    this.choices = choices.map((choice) => choice.assign(this));
  }

  /**
   * Gets the message string form of the Prompt.
   * @type {String}
   */
  get formatted() {
    var choices = this.choices
      .filter((choice) => choice.enabled)
      .map((choice) => choice.formatted);
    return this.text + '\n\n' + choices.join('\n');
  }

  /**
   * Sends the Prompt in message form to a given channel. After sending the message, reactions will be added.
   * @returns {Promise<Discord.Message>} The message sent
   */
  async display(channel) {
    var emojis = this.choices
      .filter((choice) => choice.enabled)
        .map((choice) => choice.emoji).concat([exit]);

    var msg = await channel.send(this.formatted);
    await emojis.reduce((lastPromise, emoji) => {
      return lastPromise.then(() => msg.react(emoji));
    }, Promise.resolve());
    await Prompt.removeUserReactions(msg)  // remove extra reactions before we're ready
    return msg;
  }

  static removeUserReactions(msg){ // keeps bot's reactions only
    msg.reactions.array()
      .forEach(reaction => reaction.users.array()
        .filter((user) => user.id != client.user.id)
          .forEach(user => reaction.remove(user)
            .catch(()=>logTxt("ERROR: Could I please have permission to manage messages? :)"))));
  }

  /**
   * Returns the ID of the next Prompt, given an emoji in unicode string form as the player's choice. Returns null if the emoji is the 'exit' emoji.
   * @returns {*} The ID of the next Prompt
   */
  pick(emoji) {
    if (emoji.toString() === exit) return null; // Player clicked the exit option
    return this.choices.findIndex((choice) => choice.emoji === emoji.toString());
  }

  /**
   * Displays the next prompt using `.display`, and calls the correct choice `.onChoice` function. **Do not use `.display`!** Use `.go` instead or choice handlers will not work!
   * @param {Number} index The ID of the prompt that should be displayed next
   * @param {Discord.TextChannel} channel The channel in which to display it
   * @returns {Promise<Discord.Message>} The message sent
   * @example
   * var myPrompt = Prompt.get(24);
   * myPrompt.go(myPrompt.pick(emojis.h), channel);
   */
  async go(index, channel) {
    if (index === null) return null; // A null destination exits the interface
    var choice = this.choices[index];
    var next = Prompt.registry.get(choice.dest);
    if (choice.hasOwnProperty('onChoice')) choice.onChoice(choice);
    return { msg: await next.display(channel), next: next };
  }

  /**
   * Get a Prompt by ID from the Prompt list
   * @param {*} id The id of the desired Prompt
   */
  static get(id) {
    return Prompt.registry.get(id);
  }
}

/**
 * A list of Prompts, mapped by ID.
 * @type {Discord.Collection<String, Prompt>}
 */
Prompt.registry = new Collection();
