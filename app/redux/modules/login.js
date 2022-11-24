import produce from 'immer';
import { INIT } from '../constants/reduxFormConstants';

const initialState = {
  usersLogin: {
    email: 'xmedprod@gmail.com',
    password: 'Suisse1@@',
    remember: false
  }
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action = {}) => produce(state, draft => {
  switch (action.type) {
    case INIT:
      draft.userLogin = state;
      break;
    default:
      break;
  }
});

export default loginReducer;
