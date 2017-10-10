const express = require('express');
const controller = require('../controllers/tweetsController');
const tweetsRouter = express.Router();

tweetsRouter.route('/:id')
.get(controller.getOne)
.delete(controller.destroy);

tweetsRouter.route('/')
.get(controller.index)
.post(controller.create);

module.exports = tweetsRouter;
