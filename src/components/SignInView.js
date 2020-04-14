import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';

class SignInView extends Component {
  componentDidMount () {
    M.AutoInit();
  }

  render () {
    console.log('PROPS, ', this.props);
    const { users } = this.props;
    return (
      <div className="container valign-wrapper">
      <div className="row">
        <h3>Sign In</h3>
        <p>Please select a user from the drop down list in order to sign in.</p>
        <div className="input-field col">
          <select ref="dropdown" defaultValue="0">
            <option value="0" disabled>Choose your option</option>
            { users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
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