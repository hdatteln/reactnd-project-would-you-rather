import { getInitialData} from '../utils/api';
import { setAuthedUser} from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';

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
