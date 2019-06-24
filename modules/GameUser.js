const { Collection } = require('discord.js');

var userList = new Collection();

class GameUser {
  constructor(id, message, prompt, player) {
    this.id = id;
    // Last message prompt sent by the bot to the player
    this.message = message;
    // The current prompt the player is on
    this.prompt = prompt;
    this.player = player.assign(this);
  }
}

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
  GameUser,
  Player,
  userList
};