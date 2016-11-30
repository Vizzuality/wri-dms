import { Metadata } from '../models/metadata';
import { MetadataService } from '../services/metadata.service';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { State } from '../reducers';


export enum MetadataActions {
  SEARCH
};

export class SearchAction implements Action {
  type = MetadataActions.SEARCH.toString();

  constructor(public payload: any) { }
}

export type Actions = SearchAction;

@Injectable()
export class MetadataAction {

  constructor(private metadataService: MetadataService, private store: Store<State>){

  }

  searchMetadatas(){
    this.metadataService.getMetadatas().do(x => console.log(x)).subscribe(data => this.store.dispatch(new SearchAction(data)));
  }

  deleteMetadata(metadata: Metadata){
    this.metadataService.deleteMetadata(metadata).subscribe(data => this.searchMetadatas());
  }

}
