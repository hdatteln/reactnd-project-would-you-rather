import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import HomeView from './HomeView';
import LeaderBoardView from './LeaderBoardView';
import NewQuestionView from './NewQuestionView';

class App extends Component {

  render () {
    return (
      <Router>
        <NavBar/>
        {this.props.loading === true
          ? null
          : <div>
            <Route path='/' exact component={HomeView}/>
            <Route path='/add' component={NewQuestionView}/>
            <Route path='/leaderboard' component={LeaderBoardView}/>
          </div>}
      </Router>
    );
  }
}

export default App;