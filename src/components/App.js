import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import HomeView from './HomeView';
import LeaderBoardView from './LeaderBoardView';
import NewQuestionView from './NewQuestionView';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import SignInView from './SignInView';
import PageNotFoundView from './PageNotFoundView';
import QuestionDetails from './QuestionDetails';
import M from 'materialize-css';

class App extends Component {
  componentDidMount () {
    M.AutoInit();
    this.props.dispatch(handleInitialData());
  }

  render () {
    const {users, loading, authedUser} = this.props;
    let userName = null;
    if (authedUser !== null) {
      userName = users[authedUser].name;
    }

    return (
      <Router>
        <NavBar authedUserName={userName}/>
        {loading === false && (
          <div className="container valign-wrapper">
            <Route path='/' render={() =>
              (authedUser === null
                  ? <Fragment><Route path='*' component={SignInView}/></Fragment>
                  : <Fragment>
                    <Switch>
                      <Route exact path='/' component={HomeView}/>
                      <Route path='/add' component={NewQuestionView}/>
                      <Route path='/leaderboard' component={LeaderBoardView}/>
                      <Route path='/signout' component={SignInView}/>
                      <Route path='/questions/:id' component={QuestionDetails}/>
                      <Route path='*' component={PageNotFoundView}/>
                    </Switch>
                  </Fragment>
              )
            }/>
          </div>
        )}
      </Router>
    );
  }
}

function mapStateToProps ({users, authedUser}) {
  return {
    users,
    loading: users === null || Object.keys(users).length < 1,
    authedUser
  };
}

export default connect(mapStateToProps)(App);