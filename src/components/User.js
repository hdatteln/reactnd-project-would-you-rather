import React, { Component } from 'react';

class User extends Component {

  render () {
    const {user} = this.props;
    return (

      <div className="card">
        <div className="row card-content">
          <div className="row s12 teal lighten-4">
            <div className="col"><h6><strong>{user.name}</strong></h6></div>
          </div>
          <div className="row s12">
            <div className="col card-image s4"><img src={user.avatarURL} alt={user.name}/></div>
            <div className="col s6">
              <div className="row">
                Answered Questions: {Object.keys(user.answers).length}
              </div>
              <div className="row">
                Created Questions: {user.questions.length}
              </div>
            </div>
            <div className="col s2 center-align">
              <div className="row">
                <h6>SCORE</h6>
              </div>
              <div className="row">
                <div
                  className='score teal-text text-darken-2'>{user.questions.length + Object.keys(user.answers).length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;