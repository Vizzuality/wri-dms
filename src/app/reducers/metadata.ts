import * as metadata from '../actions/metadata';
import { Metadata } from '../models/metadata';


export interface State {
  entities: Metadata[]
};

const initialState: State = {
  entities: []
};

export function reducer(state = initialState, action: metadata.Actions): State {
  switch (action.type) {
    case metadata.MetadataActions.SEARCH.toString():
      return {
        entities: action.payload.data
      }
    default:
      return state;
  }
}
