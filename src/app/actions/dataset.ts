import { DatasetService } from './../services/dataset.service';
import { IDataset } from '../models/dataset';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { State } from '../reducers';


export enum DatasetActions {
  DATASET_LOAD,
  DATASET_SEARCH
};

export class SearchAction implements Action {
  type = DatasetActions.DATASET_SEARCH.toString();

  constructor(public payload: any) { }
}

export class LoadAction implements Action {
  type = DatasetActions.DATASET_LOAD.toString();

  constructor(public payload: any) { }
}

export type Actions = SearchAction;

@Injectable()
export class DatasetAction {

  constructor(private datasetService: DatasetService, private store: Store<State>){

  }

  loadDatasets(term: string){
    this.datasetService.getDatasets(term).do(x => console.log(x)).subscribe(data => this.store.dispatch(new LoadAction(data)));
  }

  searchDatasets(term: string){
    this.store.dispatch(new SearchAction(term.toLowerCase()));
  }

}
