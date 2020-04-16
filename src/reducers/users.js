import { RECEIVE_USERS, ADD_USER_QUESTION_ANSWER, ADD_QUESTION_TO_USER } from '../actions/users';

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
    case ADD_QUESTION_TO_USER:

      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: [action.question.id].concat(...state[action.question.author].questions)
        }
      };
    default:
      return state;

  }
}