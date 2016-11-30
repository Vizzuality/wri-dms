import { IDataset } from './../models/dataset';
import * as dataset from '../actions/dataset';


export interface State {
  entities: IDataset[]
};

const initialState: State = {
  entities: []
};

export function reducer(state = initialState, action: dataset.Actions): State {
  switch (action.type) {
    case dataset.DatasetActions.DATASET_LOAD.toString():
      return {
        entities: action.payload.data
      }
    case dataset.DatasetActions.DATASET_SEARCH.toString():
      return {
        entities: state.entities.filter(el => el.attributes.name.toLowerCase().indexOf(action.payload) >= 0)
      };
    default:
      return state;
  }
}
