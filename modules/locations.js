//This stuff may end up in the database tbh

class Location {
    /**
    *    Create a new location
    *     @param {String} name name of the location
    *     @param {String} description description of the location
    *     @param {Collection} NPCs the non-player characters in the location
    *     @param {Collection} items the items that are in the location
    */
    constructor(name, description, NPCs, items){
      this.description = description;
      this.NPCs = NPCs;
      this.items = items;
    }
}
