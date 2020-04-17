import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';
import { setAuthedUser, unsetAuthedUser } from '../actions/authedUser';
import { Redirect } from 'react-router-dom';

class SignInView extends Component {
  componentDidMount () {
    M.AutoInit();

    const { authedUser } = this.props;
    if (authedUser) {
      this.handleSignout();
    }
  }

  state = {
    selectedUser: ''
  };

  handleChange = (e) => {
    const selectedUser = e.target.value;
    this.setState(function (previousState) {
      return {
        ...previousState,
        selectedUser
      };
    });
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const {selectedUser} = this.state;
    const {dispatch} = this.props;

    dispatch(setAuthedUser(selectedUser));

    this.setState(function (previousState) {
      return {
        ...previousState
      };
    });
  };

  handleSignout = () => {
    const {dispatch} = this.props;
    dispatch(unsetAuthedUser());
  };

  render () {
    const {users, authedUser} = this.props;
    if (authedUser) {
      return (<Redirect to="/"/>);
    } else {
      return (
        <div className="row">
          <div className="col s12">
            <h4>Sign In</h4>
            <p>Please select a user from the drop down list in order to sign in.</p>
            <div className="input-field col s12">
              <form action="" onSubmit={this.handleSubmit}>
                <select ref="dropdown" defaultValue="0" onChange={this.handleChange}>
                  <option value="0" disabled>Choose your option</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
                <button type='submit' className='btn'>Sign In</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps ({authedUser, users}) {
  return {
    users: Object.values(users).sort((a, b) => a.name.localeCompare(b.name)),
    authedUser
  };
}

export default connect(mapStateToProps)(SignInView);