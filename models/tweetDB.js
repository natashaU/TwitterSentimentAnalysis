const db = require('../config/dbConfig');

module.exports = {

  findAll() {
    return db.query(`SELECT * FROM sentiments`);
  },

  findById(id) {
    return db.one(`
      SELECT * FROM sentiments
      WHERE id = $1;
      `, id);
  },

   save(tweet) {
    //tweet.user_id = Number.parseInt(tweet.user_id, 10);
    //console.log(tweet);
    return db.one(`
      INSERT INTO sentiments
      (twitter_handle, positive, negative)

      VALUES
      ($/twitter_handle/, $/positive/, $/negative/)
      RETURNING *
      `, tweet);
  },


  destroy(id) {
    return db.none(`
    DELETE
    FROM sentiments
    WHERE id = $1
    `, id);
  },
};
