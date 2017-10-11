const bcrypt = require('bcryptjs');
const User = require('../../models/user');


function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createNewUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return User.create({
    username: req.body.username,
    password: hash,
  });
}

module.exports = {
  comparePass,
  createNewUser
}
