import { IWidget } from './../models/widget';
import * as widget from '../actions/widget';


export interface State {
  entities: IWidget[]
  loading: boolean
};

const initialState: State = {
  entities: null,
  loading: false
};

export function reducer(state = initialState, action: widget.Actions): State {
  switch (action.type) {
    case widget.WidgetActions[widget.WidgetActions.WIDGET_SEARCH]:
      return {
        entities: action.payload.data,
        loading: false
      }
    case widget.WidgetActions[widget.WidgetActions.WIDGET_LOADING]:
      return {
        entities: null,
        loading: true
      }
    default:
      return state;
  }
}
