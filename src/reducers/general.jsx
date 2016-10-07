import { UPDATE_APP } from 'actionNames';

const initialState = {
  app: null,
};

export default function (state = initialState, action) {

  switch (action.type) {

  case UPDATE_APP:
    return Object.assign({}, state, { app: action.payload });
  default:
    return state;

  }

}
