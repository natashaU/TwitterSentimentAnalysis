import React, { Component } from 'react';
import axios from 'axios';
import TwitterHandleForm from './TwitterHandleForm';
// user input twitter handle
import Loading from './partials/Loading';

import InputForm from './InputForm';
// input form to save API data to database

import TweetList from './TweetList';
// rendering a list of tweet analysis.


import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
// what i need for word cloud package

const fontSizeMapper = word => Math.log2(word.value) * 5;
const rotate = word => word.value % 360;
// what i need for word cloud package

class Home extends Component {

constructor(props) {
    super(props);
    this.state = {
        //resultPositive: '', // api data
        resultNegative: [], // all the negative key value pairs for word cloud in one array
        inputTwitterHandle: '', // sending user twitter handle to api
        showLoader: false, // loader to wait for API
        tweets: [], // the data we get back from the api, list of tweet analyzations
        dataParsed: false, // have this so word cloud doesn't render before data is
        //recieved from API and parsed

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

    this.handleTwitterFormSubmit = this.handleTwitterFormSubmit.bind(this);
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
     console.log(this.state,'this is changing the state<------')
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



handleTwitterFormSubmit(event) {
  console.log(this.state.inputTwitterHandleValue)
  console.log(this.state,'this is the state in home.js<------')
  event.preventDefault();
  this.setState ({
    showLoader: true,
  })
  axios.post('http://localhost:3001/api/tweets/analyze', {
    inputTwitterHandle: this.state.inputTwitterHandleValue
  }).then(res => {
    this.setState ({
      showLoader: false,

    })
    console.log(res.data.data)
    var results = res.data.data

    for (var key in results) {
      let total_words = [];
      if (key == "is negative about") {
        //console.log(results[key]);
        var myResults = results[key]
        // array of objects that have words and weights

        //each object, create a new array and put the keys into a new array
        //you have an array of keys

        //then another map to create the object to put into word cloud format
        // use results[key] to get the value, text/value word cloud format.
        const parsedWords = myResults.map((results)=>{
          const keys = Object.keys(results)
          return keys.map((key)=>{
            return {text: key, value: results[key]}
          })
        }).reduce(function(a, b) { return a.concat(b); }, []);
        this.setState({
             resultNegative: parsedWords,
             dataParsed: true
     });
        console.log(this.state.resultNegative)

        // .reduce concat function to flatten array, so that arrays are not
        // nested and they are all in one array

        // parsed data formula to push words in one array, backup algorithm in case word cloud doesn't work.

    //     for (var item in myResults) {
    //       //console.log(myResults[item])
    //       var worstList = myResults[item]
    //       //console.log(Object.keys(worstList))
    //       var word_array = Object.keys(worstList)
    //       //console.log("each word array", word_array)

    //       total_words = total_words.concat(word_array)
    //       //console.log("each total", total_words)

    //       //var wordList = myResults[item];
    //       //console.log(Object.keys(wordList))
    //       }
    //       console.log("final", total_words)
    //       this.setState({
    //         resultNegative: total_words
    // });

        }


    }

  }).catch(err => {

  console.log(err)
  })
}




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


      const loader = this.state.showLoader ? < Loading/> : null;
      const showWordCloud = this.state.dataParsed ? <WordCloud
                        data={this.state.resultNegative}
                        fontSizeMapper={fontSizeMapper}
                        rotate={rotate}
                          /> : null;



    return (
      <div>
        <div>
          <h3>Analyze your twitter profile!</h3>
          <TwitterHandleForm handleTwitterFormSubmit={this.handleTwitterFormSubmit}
                     handleInputTwitterHandleChange={this.handleInputTwitterHandleChange}
                     inputTwitterHandleValue={this.state.inputTwitterHandleValue}
                     />
          {loader}
          <button onClick={this.reload}>Refresh Page</button>
          <div className="wordCloud">
          {showWordCloud}
          </div>
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

// <p>{this.state.resultNegative}</p>

// put this under loader in render:
/*let resultcontainer = ''
      if (this.state.result === ''){
        resultcontainer = null
      } else {
        resultcontainer = (<p>Your positive score: {this.state.result}</p>)
      } */

      //{resultcontainer}
       //   <p>{this.state.sentence}</p>


// {this.drawWordCloud}



