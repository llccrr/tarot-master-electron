import Datastore from 'nedb-promise';

class Store {
  DB_NAME = {
    Players: 'players',
    Games: 'games'
  };

  constructor() {
    this.db = {};
    this.db.players = new Datastore({
      filename: './database/players.db',
      autoload: true
    });
    this.db.games = new Datastore({
      filename: './database/games.db',
      autoload: true
    });
  }

  // Private methods
  async insert(dbName, doc) {
    return this.db[dbName].insert(doc);
  }

  async update(dbName, id, doc) {
    return this.db[dbName].update({ _id: id }, doc, {});
  }

  async findAll(dbName) {
    return this.db[dbName].find({});
  }

  async find(dbName, predicate) {
    return this.db[dbName].find(predicate);
  }

  async remove(dbName, id) {
    return this.db[dbName].remove({ _id: id }, {});
  }

  // Patients db methods

  async insertPlayer(doc) {
    return this.insert(this.DB_NAME.Players, doc);
  }

  async updatePlayer(id, doc) {
    return this.update(this.DB_NAME.Players, id, doc);
  }

  async findAllPlayers() {
    return this.findAll(this.DB_NAME.Players);
  }

  async findPlayers(predicate) {
    return this.find(this.DB_NAME.Players, predicate);
  }

  async removePlayer(id) {
    return this.remove(this.DB_NAME.Players, id);
  }
}

export default new Store();
