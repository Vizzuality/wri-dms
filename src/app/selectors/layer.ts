import { ILayer } from './../models/layer';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { State } from '../reducers';
import { State as LayerState } from '../reducers/layer';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LayerSelector {

  constructor(private store: Store<State>){}

  getLayers(): Observable<ILayer[]> {
    return this.store.select( state => state.layer.entities);
  }

  getLayerState(): Observable<LayerState> {
    return this.store.select( state => state.layer);
  }

}
