const db = require('../config/dbConfig');

const User = {};

User.findByUserName = userName => {
  return db.oneOrNone('SELECT * FROM users WHERE username = $1', [userName]);
};

User.create = user => {
 return db.one(
    `
      INSERT INTO users
      (username, password)
      VALUES ($1, $2) RETURNING *
    `,
    [user.username, user.password]
  )
};

module.exports = User;
