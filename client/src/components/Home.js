import React, { Component } from 'react';
import axios from 'axios';
import TwitterHandleForm from './TwitterHandleForm';
// user input twitter handle
import Loading from './partials/Loading';

import InputForm from './InputForm';
// input form to save API data to database

import TweetList from './TweetList';
// rendering a list of tweet analysis.

class Home extends Component {

constructor(props) {
    super(props);
    this.state = {
        result: '', // api data
        inputTwitterHandle: '', // sending user twitter handle to api
        showLoader: false, // loader to wait for API
        tweets: [], // the data we get back from the api, list of tweets

        inputTwitterHandleValue: '', // twitter handle to save in form
        inputPositiveValue: '', // positive value to save in form
        inputNegativeValue: '', // negative api result to save in form
        tweetListDataReceived: false, // don't render anything until we get info
        // back from API
    }
    this.handleInputPositiveChange = this.handleInputPositiveChange.bind(this);
    this.handleInputNegativeChange = this.handleInputNegativeChange.bind(this);
    this.handleInputTwitterHandleChange = this.handleInputTwitterHandleChange.bind(this);
     // this is for the input form for the database
    this.handleInputFormSubmit = this.handleInputFormSubmit.bind(this);
    // this is for the form submit from the database

    //this.handleTwitterFormSubmit = this.handleTwitterFormSubmit.bind(this);
    // this is for when the user enters in their twitter handle to send to API

    this.handleInputResultChange = this.handleInputResultChange.bind(this);
    // this is for when we get the data back from the API

    this.reload = this.reload.bind(this);
    // reload page

  }

  reload() {
    console.log("I'm reloading")
    window.location.reload()
  }

  handleInputTwitterHandleChange (event)  {
    this.setState({
      inputTwitterHandleValue: event.target.value
    });
  }

   handleInputPositiveChange(event) {
    this.setState({
      inputPositiveValue: event.target.value
    });
  }

  handleInputNegativeChange(event) {
    this.setState({
      inputNegativeValue: event.target.value
    });
  }


handleInputResultChange(event) {
    this.setState({
      result: event.target.value
    });
  }



/*handleTwitterFormSubmit(event) {
  console.log(this.state.inputTwitterHandleApi)
  event.preventDefault();
  this.setState ({
    showLoader: true,
  })
  axios.post('http://localhost:3001/api/scores/test', {
    inputurl: this.state.inputimg
  }).then(res => {
    this.setState ({
      showLoader: false,
      faceBorder: true

    })
    console.log(res.data.data)
    const result = calculateResult(res.data.data)
     console.log(result)
    this.setState({
      result: result[0],
      sentence: result[1]
    })
  }).catch(err => {
  this.setState({showLoader: false, sentence: "Unable to Process. Please upload a valid twitter handle."})
  console.log(err)
  })
} */



   handleInputFormSubmit(event) {
    event.preventDefault();

    axios.post('http://localhost:3001/api/tweets', {
      twitter_handle: this.state.inputTwitterHandleValue,
      positive: this.state.inputPositiveValue,
      negative: this.state.inputNegativeValue,
    })
    .then(res => {

    console.log(res.data);

      {
      const newTweet = {
      twitter_handle: res.data.tweets.twitter_handle,
      positive: res.data.tweets.positive,
      negative: res.data.tweets.negative,

      }

      this.setState((prevState) => {
        return {
          tweets: prevState.tweets.concat(newTweet),
         }
       })
      }
    }).catch(err => console.log(err));
  }


    render() {


      const loader = this.state.showLoader? < Loading/> : null;



    return (
      <div>
        <div>
          <h3>Analyze your twitter profile!</h3>
          <TwitterHandleForm handleTwitterHandleFormSubmit={this.handleTwitterFormSubmit}
                     handleInputTwitterHandleChange={this.handleInputTwitterHandleChange}
                     inputTwitterHandleValue={this.state.inputTwitterHandleValue}
                     />
          {loader}
          <button onClick={this.reload}>click here to reload</button>
        </div>
        <div className="App">
        <InputForm handleInputFormSubmit={this.handleInputFormSubmit}
                 inputPositiveValue={this.state.inputPostiveValue}
                 handleInputPositiveChange={this.handleInputPositiveChange}
                 inputNegativeValue={this.state.inputNegativeValue}
                 handleInputNegativeChange={this.handleInputNegativeChange}
                 inputTwitterHandleValue={this.state.inputTwitterHandleValue}
                 handleInputTwitterHandleChange={this.handleInputTwitterHandleChange}
      />
      </div>
       </div>

    );
  }
}



export default Home;

// put this under loader in render:
/*let resultcontainer = ''
      if (this.state.result === ''){
        resultcontainer = null
      } else {
        resultcontainer = (<p>Your positive score: {this.state.result}</p>)
      } */

      //{resultcontainer}
       //   <p>{this.state.sentence}</p>






