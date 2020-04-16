import { RECEIVE_QUESTIONS, ADD_QUESTION_ANSWER } from '../actions/questions';

export default function questions (state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return  {
        ...state,
        ...action.questions
      };
    case ADD_QUESTION_ANSWER:
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          [action.selectedAnswer]: {
            ...state[action.questionId][action.selectedAnswer],
            votes: state[action.questionId][action.selectedAnswer].votes.concat([action.authedUser])
          }
        }
      };
    default:
      return state;

  }
}

