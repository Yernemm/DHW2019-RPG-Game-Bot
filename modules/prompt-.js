const { Collection } = require('discord.js');
const exit = require('./emojis.js').exit;

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

class Choice {
  /**
   * Creates a new Choice instance.
   * @param {Prompt} dest The destination Prompt
   * @param {String} emoji The reaction emoji in unicode string form
   * @param {String|Function} text The flavor text for this Choice. If a function, the property will become a getter
   * @param {Boolean} enabled Whether this Choice should be shown or not (defaults to `true`)
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
    this.enabled = enabled;
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
    var emojis = this.choices.map((choice) => choice.emoji).concat([exit]);
    var msg = await channel.send(this.formatted);
    await emojis.reduce((lastPromise, emoji) => {
      return lastPromise.then(() => msg.react(emoji));
    }, Promise.resolve());
    return msg;
  }

  /**
   * Returns the next Prompt, given an emoji in unicode string form as the player's choice. Returns null if the emoji is the 'exit' emoji.
   * @returns {Promise<Prompt>} The next Prompt
   */
  async pick(emoji) {
    if (emoji === exit) return null;
    var dest = this.choices.find((choice) => choice.emoji === emoji.toString()).dest;
    return Prompt.registry.get(dest);
  }
}

/**
 * A list of Prompts, mapped by ID.
 * @type {Discord.Collection<String, Prompt>}
 */
Prompt.registry = new Collection();

module.exports = {
  Choice,
  Prompt
};
