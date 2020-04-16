import React, { Component } from 'react'
import M from 'materialize-css';
import Question from './Question';
import { connect } from 'react-redux';

class HomeView extends Component {
  componentDidMount () {
    M.AutoInit();
  }

  render() {
    const { questions, users, authedUser } = this.props;
    let questionsArr =  Object.values(questions).sort((a,b) => a.timestamp - b.timestamp);
    const authedUserDetails = users[authedUser];
    const authedUserAnswers = Object.keys(authedUserDetails.answers);
    questionsArr = questionsArr.map((q) => {
      return {
        'id' : q.id,
        'author_id' : q.author,
        'author_name' : users[q.author].name,
        'author_avatar': users[q.author].avatarURL,
        'timestamp': q.timestamp,
        'optionOne_votes': q.optionOne.votes,
        'optionOne_text': q.optionOne.text,
        'optionTwo_votes': q.optionTwo.votes,
        'optionTwo_text': q.optionTwo.text,
      }
    });

    function questionsReducer (acc, q) {
        if (authedUserAnswers.includes(q.id)) {
          acc['answered'].push(q);
        } else {
          acc['unanswered'].push(q);
        }

      return acc;
    }

    const aggregatedQuestions = questionsArr.reduce(questionsReducer, {'answered': [], 'unanswered': []});

    return (
      <div className="row">
      <div className="row">
        <div className="col s12">
          <ul className="tabs teal-text">
            <li className="tab col s6 teal-text"><a href="#answered_no" className="active">Unanswered Questions</a></li>
            <li className="tab col s6 teal-text"><a className="active" href="#answered_yes">Answered Questions</a></li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div id="answered_no" className="col s12">
          <div className="row">
            { aggregatedQuestions.unanswered.length > 0
              ? aggregatedQuestions.unanswered.map((q) => (
                  <Question task='Poll' key={q.id} question={q}/>
                ))
              : <div>
                  <h5>You have answered all questions!</h5>
                  <p>Please check back in for new questions later.</p>
                </div>
            }
          </div>

        </div>
        <div id="answered_yes" className="col s12">
          <div className="row">
            { aggregatedQuestions.answered.length > 0
              ? aggregatedQuestions.answered.map((q) => (
              <Question task='View Results' key={q.id} question={q}/>
              ))
              : <div>
                <h5>You have answered no questions yet.</h5>
                <p>Click on the 'unanswered questions' tab to give it a go!</p>
              </div>
            }
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

export default connect(mapStateToProps)(HomeView);