import React, { Component } from 'react';
import './App.css';
import {Route, Redirect, Switch, BrowserRouter as Router} from 'react-router-dom';



//import Home from './components/Home';
import TweetForm from './components/TweetForm';
import About from './components/About';
import TweetList from './components/TweetList';
import SingleTweet from './components/SingleTweet';
//import Header from './components/partials/Header';
//import tokenService from './services/TokenServices';




class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
    }

  }
  render() {
    return (
    <Router>
      <div className="tweets">
        <main>
          <Switch>
            <Route exact path='/twitterhandles/:id' component={SingleTweet} />
            <Route exact path='/twitterhandles' component={TweetList} />
            <Route exact path='/' component={TweetForm} />
            <Route exact path='/about' component={About} />
            <Redirect to='/' />
          </Switch>
        </main>

      </div>
      </Router>
    );
  }
}

export default App;

// add more components later to put in the switch:
//<Route exact path='/' component={FaceForm} />
//<Route exact path='/add' component={Home} />

