if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
  }
  
  function list() {
    const sql = `
          SELECT *
          FROM playlists
      `;
    return db.any(sql);
  }
  
  function create(playlistname) {
    const sql = `
          INSERT INTO users (playlistname)
          VALUES ($<playlistname>)
          RETURNING *
      `;
    return db.one(sql, {playlistname});
  }
  
  module.exports = {
    list,
    create,
  };
  