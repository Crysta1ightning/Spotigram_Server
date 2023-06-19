const moment = require('moment');
if (!global.db) {
  const pgp = require('pg-promise')();
  console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
  db = pgp(process.env.DB_URL);
}

function list() {
  const sql = `
        SELECT *
        FROM stories
    `;
  return db.any(sql);
}

async function create(user_id, song_id) {
  const ts = moment().valueOf()/1000;
  let sql = `
        SELECT * FROM stories 
        WHERE user_id = $<user_id>
    `;
  db.one(sql, {user_id}).then((story) => {
    let sql = `
      UPDATE stories
      SET song_id = $<song_id>, ts = ${ts}
      WHERE user_id = $<user_id>
    `
    return db.any(sql, {user_id, song_id});
  }).catch((error) => {
    let sql = `
      INSERT INTO stories (user_id, song_id, ts)
      VALUES ($<user_id>, $<song_id>, ${ts})
      RETURNING *
    `;
    return db.one(sql, {user_id, song_id});
  })
}

function refresh() {
  const ts = moment().valueOf()/1000 - 86400;
  const sql = `
        DELETE FROM stories
        WHERE ts < ${ts}
        RETURNING *
    `;
  return db.any(sql);
}
  
module.exports = {
  list,
  create,
  refresh
};
  