import { LayerService } from './../services/layer.service';
import { ILayer } from '../models/layer';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { State } from '../reducers';


export enum LayerActions {
  LAYER_SEARCH,
  LAYER_LOADING
};

export class SearchAction implements Action {
  type = LayerActions[LayerActions.LAYER_SEARCH];

  constructor(public payload?: any) { }
}

export class LoadingAction implements Action {
  type = LayerActions[LayerActions.LAYER_LOADING];

  constructor(public payload: boolean) { }
}

export type Actions = SearchAction;

@Injectable()
export class LayerAction {

  constructor(private layerService: LayerService, private store: Store<State>){

  }
  searchLayers(term: string){
    this.loadingLayers();
    this.layerService.getLayers(term).do(x => console.log(x)).subscribe(data => this.store.dispatch(new SearchAction(data)));
  }

  loadingLayers(){
    this.store.dispatch(new LoadingAction(true));
  }

}
