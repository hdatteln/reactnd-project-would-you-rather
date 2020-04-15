import React, { Component } from 'react'
import M from 'materialize-css';
import Question from './Question';
import { connect } from 'react-redux';

class HomeView extends Component {
  componentDidMount () {
    M.AutoInit();
  }
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col s6"><a href="#unanswered">Unanswered Questions</a></li>
            <li className="tab col s6"><a className="active" href="#answered">Answered Questions</a></li>
          </ul>
        </div>
        <div id="unanswered" className="col s12"><Question type='unanswered'/></div>
        <div id="answered" className="col s12"><Question type='answered' /></div>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users).sort((a,b) => a.name.localeCompare(b.name))
  }
}

export default connect(mapStateToProps)(HomeView);