if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
  }
  
  function list(searchText = '') {
    const where = [];
    if (searchText) where.push(`songname ILIKE '%$1:value%' OR artist ILIKE '%$1:value%'`);
    const sql = `
          SELECT *
          FROM songs
          ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
      `;
    return db.any(sql, [searchText]);
  }
  
  module.exports = {
    list,
  };
  