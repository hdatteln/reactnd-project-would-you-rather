import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom';
import authedUser from '../reducers/authedUser';

class NavBar extends Component {
  render() {

    const { authedUser } = this.props;
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
          {authedUser !== null &&
            <li>
              <NavLink to='/signout' activeClassName='active'>
                Sign Out
              </NavLink>
            </li>}

        </ul>
        {authedUser !== null &&
        <div className="right loginid">
          Hello {authedUser}
        </div>}
      </nav>
    )
  }
}

export default NavBar;