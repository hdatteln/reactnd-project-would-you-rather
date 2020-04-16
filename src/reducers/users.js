import { RECEIVE_USERS, ADD_USER_QUESTION_ANSWER } from '../actions/users';

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return  {
        ...state,
        ...action.users
      };
    case ADD_USER_QUESTION_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.questionId]: action.selectedAnswer
          }
        }
      };
    default:
      return state;

  }
}