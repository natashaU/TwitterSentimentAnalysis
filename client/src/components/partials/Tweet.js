import React, { Component } from 'react';
import {Link} from 'react-router-dom';


 /*render() {
    return (
      <div className="my-tweet">

        <h3 className="tweetItem">twitter handle:{this.props.tweet.twitter_handle}</h3>
        <h3 className="tweetItem">negative: {this.props.tweet.negative}</h3>

      </div>
    );
  };
} */

class Tweet extends Component {

  render() {
    return (
    <div className="listbody">
      <li classname="li">
    <span className="hatethings">Things you hate:</span>

    <div className="user">
      <img className="emoji" src='http://cdn.shopify.com/s/files/1/1061/1924/products/Heart_Eyes_Emoji_grande.png?v=1480481053'/>
      <span

        className="twittername">@{this.props.tweet.twitter_handle}</span>
      </div>
        <span className="wordList">{this.props.tweet.negative}
        </span>
        </li>
      </div>
    );
  };
}

export default Tweet;


