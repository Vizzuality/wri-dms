import { GET_DATASETS, GET_DATASET } from 'actionNames';

const initialState = {
  list: null,
  show: null,
};

export default function (state = initialState, action) {

  switch (action.type) {

  case GET_DATASETS:
    return Object.assign({}, state, { list: action.payload });
  case GET_DATASET:
    return Object.assign({}, state, { show: action.payload });
  default:
    return state;

  }

}
