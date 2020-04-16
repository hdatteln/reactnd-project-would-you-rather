import React, { Component } from 'react'
import User from './User';
import { connect } from 'react-redux';

class LeaderBoardView extends Component {

  render() {
    const { users } = this.props;
    let usersArr =  Object.values(users).sort(
      (a,b) => (
        (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length)
      ));
    return (
      <div className="row">
        <div className="row"></div>
        <div className="row">
          <div className="col s12">
            <div className="row">
              { usersArr.map((u) => (
                <User key={u.id} user={u}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users,
  };
}

export default connect(mapStateToProps)(LeaderBoardView);