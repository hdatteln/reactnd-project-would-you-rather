import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { withRouter } from 'react-router-dom';

class NewQuestionView extends Component {
  state = {
    newOptionOne: '',
    newOptionTwo: ''
  };
  handleQuestionChange = (e) => {
    e.persist();
    if (e.target && e.target.name === 'opt1') {
      this.setState(() => ({
        newOptionOne: e.target.value
      }));
    } else if (e.target && e.target.name === 'opt2') {
      this.setState(() => ({
        newOptionTwo: e.target.value
      }));
    }
  };

  handleQuestionSubmit = (e) => {
    e.preventDefault();

    const {newOptionOne, newOptionTwo} = this.state;
    const {dispatch, authedUser} = this.props;
    if (newOptionOne !== '' && newOptionTwo !== '') {
      dispatch(handleAddQuestion({
        optionOneText: newOptionOne,
        optionTwoText: newOptionTwo,
        author: authedUser
      }));
      this.setState(() => ({
        newOptionOne: '',
        newOptionTwo: ''
      }));
    }
    this.props.history.push('/');
  };

  render () {

    return (
      <div className="row">
        <div className="row"></div>
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="card">
                <div className="row card-content">
                  <div className="row s12 teal lighten-4">
                    <div className="col"><h6><strong>Create A New Question</strong></h6></div>
                  </div>
                  <div className="row s12 center-align">
                    <h6>Complete the question!</h6>
                    <div>Would you rather...</div>
                    <form onSubmit={this.handleQuestionSubmit}>
                      <input
                        name="opt1"
                        type="text"
                        placeholder="Option 1..."
                        onChange={this.handleQuestionChange}
                        value={this.state.newOptionOne}
                      />
                      <div>OR</div>
                      <input
                        name="opt2"
                        type="text"
                        placeholder="Option 2..."
                        onChange={this.handleQuestionChange}
                        value={this.state.newOptionTwo}
                      />
                      <div className="btnwrap">
                        <button type='submit' className='btn'> Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({authedUser}) {
  return {
    authedUser
  };
}

export default withRouter(connect(mapStateToProps)(NewQuestionView));