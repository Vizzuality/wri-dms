import { combineLatest } from 'rxjs/observable/combineLatest';
import { ActionReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as metadata from './metadata';
import * as layer from './layer';
import * as dataset from './dataset';
import * as widget from './widget';

export interface State {
  metadata: metadata.State,
  dataset: dataset.State,
  layer: layer.State,
  widget: widget.State
}

const reducers = {
  metadata: metadata.reducer,
  dataset: dataset.reducer,
  layer: layer.reducer,
  widget: widget.reducer,
  router: routerReducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  }
  else {
    return developmentReducer(state, action);
  }
}
