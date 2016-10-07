import { LOGIN_FAIL, LOGIN, GENERATE_TOKEN, LOGOUT, LOGIN_CHECKING } from 'actionNames';

const initialState = {
  correct: null,
  checking: false,
};

export default function (state = initialState, action) {

  switch (action.type) {

  case LOGIN_FAIL:
    return Object.assign({}, state, { correct: false, checking: false });
  case LOGIN_CHECKING:
    return Object.assign({}, state, { checking: true });
  case LOGIN:
    return Object.assign({}, state, { correct: true, cheking: false, user: action.payload });
  case LOGOUT:
    return Object.assign({}, state, { correct: false, user: null });
  case GENERATE_TOKEN:
    return Object.assign({}, state, { token: action.payload.token });


  default:
    return state;

  }

}
