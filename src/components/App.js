import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route,browserHistory,
  Switch } from 'react-router-dom';
import NavBar from './NavBar';
import HomeView from './HomeView';
import LeaderBoardView from './LeaderBoardView';
import NewQuestionView from './NewQuestionView';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import SignInView from './SignInView';
import PageNotFoundView from './PageNotFoundView';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render () {
    const { loading, authedUser } = this.props;
    return (
      <Router>
        <NavBar/>
        {loading === false && (
          <div className="container valign-wrapper">
          <Route path='/' render={() =>
            (authedUser === null
                ? <Route component={SignInView} />
                : <Fragment>
                <Switch>
                    <Route exact path='/' component={HomeView} />
                    <Route path='/add' component={NewQuestionView} />
                    <Route path='/leaderboard' component={LeaderBoardView} />
                    <Route path='*' component={PageNotFoundView} />
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
    loading: users === null || Object.keys(users).length < 1,
    authedUser
  };
}

export default connect(mapStateToProps)(App);