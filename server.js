const express = require('express')
const Twitter = require('twitter')
const app = express()

let client = new Twitter({

});

app.get('/', function (req, res) {
  res.send("Hello world!")
})

app.get('/trending', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var params = {id: '23424819'};
  client.get('trends/place.json', params, function(error, tweets, response){
      if (!error) {
        res.send(tweets)
      } else {
        res.send(error)
      }
  })
})

app.get('/tweets', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var params = {q: req.query.hashtag, result_type: "popular", tweet_mode: "extended"};
  console.log(params)
  client.get('search/tweets.json', params, function(error, tweets, response){
      if (!error) {
        res.send(tweets)
      } else {
        res.send(error)
      }
  })
})

app.listen(3000, function () {
  console.log('Back listening on port 3000!')
})