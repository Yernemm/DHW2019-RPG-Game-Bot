const { Collection } = require('discord.js');

class GameUser {
  constructor(id, message, prompt, player) {
    this.id = id;
    // Last message prompt sent by the bot to the player
    this.message = message;
    // The current prompt the player is on
    this.prompt = prompt;
    this.player = player.assign(this);
  }

  exit() {
    GameUser.registry.delete(this.id);
  }

  static get(id) {
    return GameUser.registry.get(id);
  }

  static set(id, user) {
    return GameUser.registry.set(id, user);
  }

  static has(id) {
    return GameUser.registry.has(id);
  }

  // Gets a GameUser, creating it if it doesn't exist
  static retrieve(id) {
    if (!GameUser.has(id)) {
      GameUser.set(id, new GameUser(id, null, -1, new Player(-1, 0)));
    }
    return GameUser.get(id);
  }
}

GameUser.registry = new Collection();

class Player {
  constructor(hp, exp) {
    this.hp = hp;
    this.exp = exp;
    this.user = null;
  }

  assign(user) {
    this.user = user;
    return this;
  }
}

module.exports = {
  GameUser: GameUser
};
