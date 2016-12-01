import * as metadata from '../actions/metadata';
import { Metadata } from '../models/metadata';


export interface State {
  entities: Metadata[],
  edit: Metadata
};

const initialState: State = {
  entities: [],
  edit: null
};

export function reducer(state = initialState, action: metadata.Actions): State {
  switch (action.type) {
    case metadata.MetadataActions[metadata.MetadataActions.SEARCH]:
      return {
        entities: action.payload.data,
        edit: Object.assign({}, state.edit)
      }
    case metadata.MetadataActions[metadata.MetadataActions.METADATA_OBTAIN]:
      return {
        entities: state.entities,
        edit: action.payload
      }
    default:
      return state;
  }
}
