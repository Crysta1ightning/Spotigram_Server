if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
}

function list() {
    const sql = `
        SELECT *
        FROM timelines
        `;
    return db.any(sql);
}

module.exports = {
    list,
}