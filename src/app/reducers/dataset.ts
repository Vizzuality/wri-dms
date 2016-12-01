import { IDataset } from './../models/dataset';
import * as dataset from '../actions/dataset';


export interface State {
  entities: IDataset[]
  loading: boolean
};

const initialState: State = {
  entities: null,
  loading: false
};

export function reducer(state = initialState, action: dataset.Actions): State {
  switch (action.type) {
    case dataset.DatasetActions[dataset.DatasetActions.DATASET_SEARCH]:
      return {
        entities: action.payload.data,
        loading: false
      }
    case dataset.DatasetActions[dataset.DatasetActions.DATASET_LOADING]:
      return {
        entities: null,
        loading: true
      }
    default:
      return state;
  }
}
