import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  render () {

    const {authedUserName} = this.props;
    return (
      <nav className="teal darken-3">
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          {authedUserName !== null &&
          <li>
            <NavLink to='/signout' activeClassName='active'>
              Sign Out
            </NavLink>
          </li>}

        </ul>
        {authedUserName !== null &&
        <div className="right loginid">
          Hello {authedUserName}
        </div>}
      </nav>
    );
  }
}

export default NavBar;