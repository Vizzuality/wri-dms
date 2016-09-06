import { GET_DATASETS } from 'actionNames';

const initialState = {
  list: null,
};

export default function (state = initialState, action) {

  switch (action.type) {

  case GET_DATASETS:
    return Object.assign({}, state, { list: action.payload });
  default:
    return state;

  }

}
