const express = require('express');
const usersRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const User = require('../models/user')



usersRouter.post('/register', (req, res, next) => {
authHelpers.createNewUser(req, res)
  .then((user) => {
    //req.login(user, (err) => {
     // if (err) return next(err);

      res.json({user: {
        username: user.username
      }});
  })
  .catch((err) => { res.status(500).json({ status: 'error' }); });
});

usersRouter.post('/login', (req, res, next) => {
User.findByUserName(req.body.username)
  .then(user =>  {
    if (!user) {
      res.status(401).json({
        error: "no user found"
      })
    }
    if  (!authHelpers.comparePass(req.body.password, user.password)) {
      res.status(401).json ({
        error: "password don't match"
      })
    } else {
       res.status(200).json ({
        user: user.username
       })
    }

  })
  .catch((err) => { res.status(500).json({ status: 'error' }); });
});





// input (form), two forms (log in and register) req.body.username,

// sending info from form to THIS route


module.exports = usersRouter;
