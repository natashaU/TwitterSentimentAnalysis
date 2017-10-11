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

  /*renderTweet() {
    if (this.state.tweetDataReceived === true) {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      <div className="my-score">
      <div id="imgList">
      <img src={this.state.score.url}/>
      </div>
      <h3>{this.state.isEditing ? <input onChange={this.handleChange} name="happy" type="text" value={this.state.score.happy}/> : this.state.score.happy}</h3>
      <h3>{this.state.isEditing ? <input onChange={this.handleChange} name="mad" type="text" value={this.state.score.mad}/> : this.state.score.mad}</h3>
      <h3>{this.state.isEditing ? <input onChange={this.handleChange} name="url" type="text" value={this.state.score.url}/> : this.state.score.url}</h3>
      <h3>{this.state.isEditing ? <input onChange={this.handleChange} name="result" type="text" value={this.state.score.result}/> : this.state.score.result}</h3>

      <label> {this.state.isEditing ?

       <select value={this.state.score.user_id} onChange={this.handleChange} name="user_id" type="num">
        <option value='1'>Julia</option>
        <option value='2'>Ann</option>
        <option value='3'>Jess</option>
        <option value='4'>Norma</option>
        <option value='5'>Mike</option>
        <option value='6'>Jane</option>
        <option value='7'>Tom</option>
       </select> : this.state.score.name}
      </label>

        </div>
        {this.state.isEditing ? <button type="submit">Save</button> : ''}
        {this.state.isEditing ? <button onClick={this.handleCancel}>Cancel</button> : ''}
        </form>
        </div>
      );
    } else return <Loading />;
  } */

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
