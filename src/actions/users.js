export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_QUESTION_ANSWER = 'ADD_USER_QUESTION_ANSWER';

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}


export function addUserQuestionAnswer(authedUser, questionId, selectedAnswer) {
  return {
    type: ADD_USER_QUESTION_ANSWER,
    authedUser,
    questionId,
    selectedAnswer
  }
}