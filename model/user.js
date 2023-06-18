if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
  }
  
  function list() {
    const sql = `
          SELECT user_id, username
          FROM users
      `;
    return db.any(sql);
  }
  
  function create(username, encoded_pwd) {
    const sql = `
          INSERT INTO users (username, password)
          VALUES ($<username>, $<encoded_pwd>)
          RETURNING (user_id)
      `;
    return db.one(sql, {username, encoded_pwd});
  }

  function login(username, encoded_pwd) {
    const sql = `
          SELECT user_id
          FROM users
          WHERE username='$1:value' AND password='$2:value'
      `;
    return db.any(sql, [username, encoded_pwd]);
  }
  
  module.exports = {
    list,
    create,
    login
  };
  