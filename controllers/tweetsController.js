const tweetDB = require('../models/tweetDB');
const algorithmia = require("algorithmia");

module.exports = {


  index(req, res) {
    console.log("getting index")
    tweetDB.findAll()
     .then(tweets => {
       res.json({
        message: 'ok',
        data: { tweets },
       });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({message: '400', err});
      });
    },

   getOne(req, res) {
    tweetDB.findById(req.params.id)
    .then(tweet => {
      res.json({
        message: 'ok',
        data: { tweet },
      });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({message: '400', err});
      });
    },

   create(req, res) {
    tweetDB.save({
      twitter_handle: req.body.twitter_handle,
      positive: req.body.positive,
      negative: req.body.negative,
    })
    .then(tweet => {
      res.json({message: 'ok', data: { tweet }});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
    });
  },


   destroy(req, res) {
    tweetDB.destroy(req.params.id)
    .then(() => {
    }).catch(err => {
        console.log(err);
        res.status(400).json({message: '400', err});
      });
    },

   showTweetForm: (req, res) => {
    res.json({
      message: 'Im HTML for new tweets',
    });
   },
}
