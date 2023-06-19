if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
}
  
function list(playlist_id) {
    const where = [];
    if (playlist_id) where.push(`playlist_id = '$1:value'`);
    const sql = `
            SELECT *
            FROM playlists_owners
            ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        `;
    return db.any(sql, [playlist_id]);
}

function create(playlist_id_id, user_id) {
    const sql = `
          INSERT INTO playlists_owners (playlist_id, user_id)
          VALUES ($<playlist_id>, $<user_id>)
          RETURNING *
      `;
    return db.one(sql, {playlist_id_id, user_id});
  }

module.exports = {
    list,
    create
};
