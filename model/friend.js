if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
}
  
function list(user_id) {
    const where = [];
    // user_id = 2;
    if (user_id) where.push(`user1_id = '$1:value' OR user2_id = '$1:value'`);
    const sql = `
            SELECT *
            FROM friends
            ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        `;
    return db.any(sql, [user_id]);
}

module.exports = {
    list,
};
