import React from 'react'
import { NavLink} from 'react-router-dom';
import authedUser from '../reducers/authedUser';

export default function NavBar() {
  return (
    <nav>
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
        {authedUser !== null && (
          <li>
            <NavLink to='/' activeClassName='active'>
              Sign Out
            </NavLink>
          </li>
        )}

      </ul>
    </nav>
  )
}

