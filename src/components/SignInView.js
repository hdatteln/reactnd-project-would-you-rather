import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';
import { setAuthedUser } from '../actions/authedUser';

class SignInView extends Component {
  componentDidMount () {
    M.AutoInit();
  }
  state = {
    selectedUser: '',
    toHome: false
  };
  handleChange = (e) => {
    const selectedUser = e.target.value;
    this.setState(function(previousState) {
      return {
        ...previousState,
        selectedUser,
      };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedUser } = this.state;
    const {dispatch } = this.props;

    dispatch(setAuthedUser(selectedUser));

    this.setState(function(previousState) {
      return {
        ...previousState,
        toHome: selectedUser ? false: true
      };
    });
  };

  render () {
    const { users } = this.props;
    return (
      <div className="row">
        <h3>Sign In</h3>
        <p>Please select a user from the drop down list in order to sign in.</p>
        <div className="input-field col">
          <form action="" onSubmit={this.handleSubmit}>
          <select ref="dropdown" defaultValue="0" onChange={this.handleChange}>
            <option value="0" disabled>Choose your option</option>
            { users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          <button type='submit' className='btn'>Sign In</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users).sort((a,b) => a.name.localeCompare(b.name))
  }
}

export default connect(mapStateToProps)(SignInView);