import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Question extends Component {

  handlePollSubmit = (e) => {
    e.preventDefault();
    console.log('submitted')
  };

  toQuestion = (e, id) => {
    e.preventDefault();

    this.props.history.push(`/questions/${id}`)

  };

  render() {
    const { question, action } = this.props;

    return (

          <div key={question.id} className="card">
            <div className="row card-content">
              <div className="row s12 teal lighten-4">
                <div className="col"><h6><strong>{question.author_name}</strong> asks:</h6></div>
              </div>
              <div className="row s12">
                <div className="col card-image s4"><img src={question.author_avatar} alt={question.author_name}/></div>
                <div className="col s8">
                  <strong>Would you rather...</strong>
                  {action === 'poll'
                    ? <div>
                        <form onChange={this.handlePollSubmit}>
                          <p>
                            <label>
                              <input name="group1" type="radio" defaultChecked />
                              <span>{question.optionOne_text} </span>
                            </label>
                          </p>
                          <p>
                            <label>
                              <input name="group1" type="radio" />
                              <span>{question.optionTwo_text}</span>
                            </label>
                          </p>
                          <button className='btn'> Submit </button>
                        </form>
                      </div>
                    : <div>
                        <div>{question.optionOne_text}  -OR-  {question.optionTwo_text}&nbsp;?</div>
                          <div className="btnwrap">
                          <button onClick={(e) => this.toQuestion(e, question.id)} className='btn'> Poll </button>
                           </div>
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
export default withRouter(connect(mapStateToProps)(Question));