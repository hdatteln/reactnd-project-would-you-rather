import { saveQuestion } from '../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading';

export const ADD_QUESTION = 'ADD_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleAddQuestion (question) {
  return (dispatch, getState) => {
    const {authedUser} = getState();

    dispatch(showLoading());
    return saveQuestion({
      question
    }).then((question) => dispatch(addQuestion(question))).then(() => dispatch(hideLoading()));

  };
}

export function addQuestionAnswer(authedUser, questionId, selectedAnswer) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    questionId,
    selectedAnswer
  }
}

