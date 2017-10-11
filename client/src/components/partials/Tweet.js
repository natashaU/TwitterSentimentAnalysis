import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Tweet extends Component {

  render() {
    return (
      <div className="my-tweet">

        <h3 className="tweetItem">twitter handle:{this.props.tweet.twitter_handle}</h3>
        <h3 className="tweetItem">positive: {this.props.tweet.positive}</h3>
        <h3 className="tweetItem">negative: {this.props.tweet.negative}</h3>
        <Link id="tweetLink" to={`/api/tweets/${this.props.tweet.id}`}>See twitter analysis details</Link>

      </div>
    );
  };
}

export default Tweet;
