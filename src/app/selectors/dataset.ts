import { IDataset } from './../models/dataset';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { State } from '../reducers';
import { State as DatasetState } from '../reducers/dataset';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DatasetSelector {

  constructor(private store: Store<State>){}

  getDatasets(): Observable<IDataset[]> {
    return this.store.select( state => state.dataset.entities);
  }

  getDatasetState(): Observable<DatasetState> {
    return this.store.select( state => state.dataset);
  }

  getLoading(): Observable<boolean> {
    return this.store.select( state => state.dataset.loading );
  }

}
