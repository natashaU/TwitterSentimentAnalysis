import React, { Component } from 'react';

import axios from 'axios';

import Tweet from './partials/Tweet';
import Loading from './partials/Loading';
import SingleTweet from './SingleTweet';

class TweetList extends Component {
  constructor() {
    super();
    this.state = {
      tweets: [],
      tweetListDataReceived: false,
  }
  this.getAllTweets = this.getAllTweets.bind(this);
  }

componentDidMount(){
    this.getAllTweets()
  }

   getAllTweets() {
    axios.get('http://localhost:3001/api/tweets')
   .then(res => {
     this.setState(prevState => {
      return {
        tweets: res.data.data.tweets,
        tweetListDataReceived: true,
       }
      });
    });
  }

   renderTweetList() {
    if (this.state.tweetListDataReceived === true) {
      return this.state.tweets.map(tweet =>
         <Tweet tweet={tweet} key={tweet.id} />
      );
    } else return <Loading />
  }

  render() {
    return (
      <div className="tweetlist">
       {this.renderTweetList()}
      </div>
    );
  };
}

export default TweetList;
