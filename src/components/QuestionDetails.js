import React, { Component } from 'react'
import M from 'materialize-css';
import Question from './Question';
import { connect } from 'react-redux';

class QuestionDetails extends Component {
  componentDidMount () {
    M.AutoInit();
  }

  render() {
    const { questions, users } = this.props;
    const { id } = this.props.match.params;
    const q = { ...questions[id] };
    const author = users[q.author];
    q.optionOne_text = q.optionOne.text;
    q.optionTwo_text = q.optionTwo.text;
    q.author_name = author.name;
    q.author_avatar = author.avatarURL;

    return (
      <div className="row">
        <div className="row">
          <div className="col s12">
            <div className="row"></div>
            <div className="row">
            <Question  question={q} action='poll'/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, users }) {
  return {
    questions,
    users,
  };
}

export default connect(mapStateToProps)(QuestionDetails);