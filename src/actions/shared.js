import { getInitialData, saveQuestionAnswer } from '../utils/api';
import { addQuestionAnswer, receiveQuestions } from './questions';
import { addUserQuestionAnswer, receiveUsers } from './users';

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData().then(({users, questions}) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

export function handleAnswerQuestion (questionId, selectedOption, authedUser) {
  return (dispatch, getState) => {

    saveQuestionAnswer({
      authedUser,
      qid: questionId,
      answer: selectedOption
    }).then(() => {
      dispatch(addQuestionAnswer(authedUser, questionId, selectedOption));
      dispatch(addUserQuestionAnswer(authedUser, questionId, selectedOption));
    });
  };
}