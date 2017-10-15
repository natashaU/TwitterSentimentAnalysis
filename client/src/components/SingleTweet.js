import React, { Component } from 'react';
import Loading from './partials/Loading';
import axios from 'axios';
import { Route, Redirect } from 'react-router';
import TweetList from './TweetList';


class SingleTweet extends Component {

  constructor(props) {
    super(props);

    this.state = {
        id: this.props.match.params.id,
        tweet: {
        twitter_handle: '',
        positive: '',
        negative: '',
      },
      tweetDataReceived: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
   axios.get(`http://localhost:3001/api/tweets/${this.state.id}`)
    .then(res => {
     this.setState(prevState => {
      return {
        tweet: res.data.data.tweet,
        tweetDataReceived: true,
         }
      });
    });
  }

  handleDelete() {
    axios.delete(`http://localhost:3001/api/tweets/${this.state.id}`)
    this.props.history.push('/api/tweets')
  }


  handleSubmit(event) {
    event.preventDefault();
    axios.put(`http://localhost:3001/api/tweets/${this.state.id}`,
    {
      twitter_handle: this.state.tweet.twitter_handle,
      positive: this.state.tweet.positive,
      negative: this.state.tweet.negative,
    })
  }

  handleChange(event) {
    this.setState({
      tweet: { ...this.state.tweet, [event.target.name]: event.target.value }
    })
  }


  renderButtons() {
    return (
      <span>
        <button onClick={this.handleDelete}>Delete</button>
      </span>
    )}


  render() {
    return (
      <div className="single-tweet">
        {this.renderButtons()}
      </div>
  )};
}

export default SingleTweet;
