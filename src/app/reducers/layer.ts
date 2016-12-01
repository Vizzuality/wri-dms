import { ILayer } from './../models/layer';
import * as layer from '../actions/layer';


export interface State {
  entities: ILayer[]
  loading: boolean
};

const initialState: State = {
  entities: null,
  loading: false
};

export function reducer(state = initialState, action: layer.Actions): State {
  switch (action.type) {
    case layer.LayerActions[layer.LayerActions.LAYER_SEARCH]:
      return {
        entities: action.payload.data,
        loading: false
      }
    case layer.LayerActions[layer.LayerActions.LAYER_LOADING]:
      return {
        entities: null,
        loading: true
      }
    default:
      return state;
  }
}
