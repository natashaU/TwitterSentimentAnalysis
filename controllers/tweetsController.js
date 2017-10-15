const tweetDB = require('../models/tweetDB');
const Algorithmia = require("algorithmia");

//var api_key = process.env.API_KEY //

//var client = algorithmia(api_key);

module.exports = {

getApi(req, res) {
  console.log("getting api, inside function")
  console.log(req.body.inputTwitterHandle)
  let input =  {
    "query": req.body.inputTwitterHandle,
    "auth":
           .algo("algo://diego/AnalyzeTwitterUser/0.1.6")
           .pipe(input)
           .then(function(output) {
             console.log(output);
             console.log('still good here 3')
             //console.log(output.result.following)
             // for (var key in output.result) {
             //  //console.log(key)
             //  if (key == "is positive about") {
             //    console.log(output.result[key]);
             //    var positiveData = output.result[key]

             //  } if (key == "is negative about") {
             //    console.log(output.result[key]);
             //    var negativeData = output.result[key]
             //  }
             // res.json({negativeData: negativeData, positiveData: positiveData});
              //console.log(negativeData)
                 res.json({data:output.result})
             //}
           });


// command question mark to uncomment

const data = {
  "data": {
    "followers": 1472,
    "following": 2767,
    "is negative about": [
      {
        "fuck": 5,
        "lost": 3,
        "people": 4,
        "asked": 2,
        "lol": 2,
        "make": 2,
        "ripmarkusj": 2,
        "school": 2,
        "science": 2
      },
      {
        "people": 3
      }
    ],
    "is positive about": [
      {
        "asked": 2,
        "lol": 2,
        "make": 2,
        "ripmarkusj": 2,
        "school": 2,
        "science": 2
      },
      {
        "america": 2,
        "born": 2,
        "love": 2,
        "open": 2
      },
      {
        "dream": 2,
        "hope": 2,
        "love": 2,
        "people": 2,
        "state": 2,
        "video": 2,
        "won": 2
      },
      {
        "change": 3,
        "college": 2,
        "guy": 2,
        "high": 2,
        "love": 2,
        "people": 4,
        "rich": 2
      }
    ],
    "screen_name": "natty_t_ice"
  }
}

          res.json(data)


           //var responseData = response.get().results[0].emotions;
             //res.json({data: responseData});

  },


 /* getApi(req, res) {
    console.log(req.body.inputurl)
    console.log("getting api");

// "https://qzprod.files.wordpress.com/2015/09/rtr4n4v3.jpg",



  var input = {
  "image": req.body.inputurl,
  "numResults": 7
};



          client
           .algo("algo://deeplearning/EmotionRecognitionCNNMBP/1.0.1")
           .pipe(input)
           .then(function(response) {
             console.log(response.get().results[0].emotions[0]);
             var responseData = response.get().results[0].emotions;
             res.json({data: responseData});
            //res.json({ data: {response.get()},
          })

}, */


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
