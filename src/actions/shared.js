import { getInitialData, saveQuestionAnswer} from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveQuestions, addQuestionAnswer } from './questions';
import { receiveUsers, addUserQuestionAnswer } from './users';

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({users, questions}) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    })
  }
}

export function handleAnswerQuestion (questionId, selectedOption, authedUser) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    console.log('ths answer', selectedOption)

    saveQuestionAnswer({
      authedUser,
      qid: questionId,
      answer: selectedOption
    }).then(() => {
      dispatch(addQuestionAnswer(authedUser, questionId, selectedOption));
      dispatch(addUserQuestionAnswer(authedUser, questionId, selectedOption));
      dispatch(hideLoading());
    });
  }
}