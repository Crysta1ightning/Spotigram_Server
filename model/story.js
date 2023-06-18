if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
  }

  function findFriend(user_id) {
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

  function list(user_id) {
    let data = findFriend(user_id);
    let friend = [];
    for (let i=0; i<data.length; i++) {
      friend.push({id: (data[i].user1_id == default_userid ? data[i].user2_id : data[i].user1_id)});
    }
    const where = [];
    // user_id = 2;
    if (friend) where.push(`user_id = '$1:value'`);
    const sql = `
            SELECT user_id, username, profile_pic
            FROM users
            ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        `;
    return db.any(sql, [user_id]);
  }
  
  module.exports = {
    list,
  };
  