import { DatasetService } from './../services/dataset.service';
import { IDataset } from '../models/dataset';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { State } from '../reducers';


export enum DatasetActions {
  DATASET_SEARCH,
  DATASET_LOADING
};

export class SearchAction implements Action {
  type = DatasetActions[DatasetActions.DATASET_SEARCH];

  constructor(public payload: any) { }
}

export class LoadingAction implements Action {
  type = DatasetActions[DatasetActions.DATASET_LOADING];

  constructor(public payload: boolean) { }
}

export type Actions = SearchAction;

@Injectable()
export class DatasetAction {

  constructor(private datasetService: DatasetService, private store: Store<State>){}

  searchDatasets(term: string){
    this.loadingDatasets();
    this.datasetService.getDatasets(term).do(x => console.log(x)).subscribe(data => this.store.dispatch(new SearchAction(data)));
  }

  loadingDatasets(){
    this.store.dispatch(new LoadingAction(true));
  }

}
