import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../actions/shared';

class Question extends Component {

  state = {
    selectedAnswer: ''
  };

  handlePollChange = (e) => {
    const selectedAnswer = e.target.value;

    this.setState(() => ({
      selectedAnswer
    }));
  };

  handlePollSubmit = (e) => {
    e.preventDefault();

    const {selectedAnswer} = this.state;
    const {id} = this.props.match.params;
    const {dispatch, authedUser} = this.props;

    if (selectedAnswer !== '') {
      //questionId, selectedOption, authedUser
      dispatch(handleAnswerQuestion(id, selectedAnswer, authedUser));
      this.setState(() => ({
        selectedAnswer: ''
      }));
    }

  };

  toQuestion = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/questions/${id}`);
  };

  render () {
    const {task, question, action, authedUser, users} = this.props;
    const authedUserDetails = users[authedUser];
    let answered = authedUserDetails.answers[question.id] ? true : false;
    let totalVotes, opt1votes, opt2votes = 0;
    let option1Style, option2Style = 'votesResult';
    let opt1yourvote, opt2yourvote = 'hide';
    if (question.optionOne) {
      opt1yourvote = question.optionOne['votes'].includes(authedUser) ? 'show orange-text text-accent-4' : 'hide';
      opt2yourvote = question.optionTwo['votes'].includes(authedUser) ? 'show orange-text text-accent-4' : 'hide';
      opt1votes = question.optionOne['votes'].length;
      opt2votes = question.optionTwo['votes'].length;
      totalVotes = opt1votes + opt2votes;
      option1Style = opt1votes > opt2votes ? 'votesWinner' : 'votesResult';
      option2Style = opt2votes > opt1votes ? 'votesWinner' : 'votesResult';
    }
    return (

      <div key={question.id} className="card">
        <div className="row card-content">
          <div className="row s12 teal lighten-4">
            <div className="col"><h6><strong>{question.author_name}</strong> asks:</h6></div>
          </div>
          <div className="row s12">
            <div className="col card-image s4 center-align"><img src={question.author_avatar}
                                                                 alt={question.author_name}/></div>
            <div className="col s8">
              {action === 'poll'
                ? <div>
                  {answered === true
                    ? <div>
                      <h6>Results:</h6>
                      <div>
                        {option1Style === 'votesWinner'
                          ? <i className="material-icons icon-yellow">star_border</i>
                          : ''
                        }<strong className={option1Style}>Would you rather... <b>{question.optionOne_text}</b>?</strong>
                        <div className='voteResultDetails'>
                          {opt1votes} of {totalVotes} out of votes &nbsp;<span id="opt1v" className={opt1yourvote}>Your Vote!</span>
                        </div>
                      </div>
                      <hr/>
                      <div>
                        {option2Style === 'votesWinner'
                          ? <i className="material-icons icon-yellow">star_border</i>
                          : ''
                        }<strong className={option2Style}>Would you rather... <b>{question.optionTwo_text}</b>?</strong>
                        <div className='voteResultDetails'>
                          {opt2votes} of {totalVotes} out of votes &nbsp;<span id="opt2v" className={opt2yourvote}>Your Vote!</span>
                        </div>
                      </div>

                    </div>
                    : <div>
                      <h6>Would you rather...</h6>
                      <form onSubmit={this.handlePollSubmit}>
                        <p>
                          <label>
                            <input
                              className="with-gap"
                              name="group1"
                              type="radio"
                              onChange={this.handlePollChange}
                              value='optionOne'
                            />
                            <span>{question.optionOne_text} </span>
                          </label>
                        </p>
                        <p>
                          <label>
                            <input
                              className="with-gap"
                              name="group1"
                              type="radio"
                              onChange={this.handlePollChange}
                              value='optionTwo'/>
                            <span>{question.optionTwo_text}</span>
                          </label>
                        </p>
                        <button type="submit" className="btn"> Submit</button>
                      </form>
                    </div>

                  }
                </div>
                : <div>
                  <h6>Would you rather...</h6>
                  <div>{question.optionOne_text} -OR- {question.optionTwo_text}&nbsp;?</div>
                  <div className="btnwrap">
                    <button onClick={(e) => this.toQuestion(e, question.id)} className='btn'> {task} </button>
                  </div>
                </div>
              }

            </div>
          </div>
        </div>

      </div>

    );
  }
}

function mapStateToProps ({authedUser, questions, users}) {
  return {
    authedUser,
    questions,
    users
  };
}

export default withRouter(connect(mapStateToProps)(Question));