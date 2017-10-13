const express = require('express');
const controller = require('../controllers/tweetsController');
const tweetsRouter = express.Router();

tweetsRouter.route('/:id')
.get(controller.getOne)
.delete(controller.destroy);

tweetsRouter.route('/')
.get(controller.index)
.post(controller.create);
//.get(controller.getApi)

tweetsRouter.route('/analyze')
.post(controller.getApi)

module.exports = tweetsRouter;
