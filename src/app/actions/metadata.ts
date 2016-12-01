import { Metadata } from '../models/metadata';
import { MetadataService } from '../services/metadata.service';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { State } from '../reducers';
import { go } from '@ngrx/router-store';
import { FlashMessagesService } from 'angular2-flash-messages';


export enum MetadataActions {
  SEARCH,
  METADATA_CREATE,
  METADATA_OBTAIN
};

export class SearchAction implements Action {
  type = MetadataActions[MetadataActions.SEARCH];

  constructor(public payload: any) { }
}

export class CreateAction implements Action {
  type = MetadataActions[MetadataActions.METADATA_CREATE];

  constructor(public payload: any) { }
}

export class ObtainMetadata implements Action {
  type = MetadataActions[MetadataActions.METADATA_OBTAIN];

  constructor(public payload: Metadata) { }
}

export type Actions = SearchAction;

@Injectable()
export class MetadataAction {

  constructor(private metadataService: MetadataService, private store: Store<State>, private flashMessagesService: FlashMessagesService){

  }

  searchMetadatas(){
    this.metadataService.getMetadatas().do(x => console.log(x)).subscribe(data => this.store.dispatch(new SearchAction(data)));
  }

  deleteMetadata(metadata: Metadata){
    this.metadataService.deleteMetadata(metadata).subscribe(data => this.searchMetadatas());
  }

  createMetadata(metadata: Metadata){
    this.metadataService.createMetadata(metadata).subscribe((data) =>  {
      this.flashMessagesService.show('Metadata created successfully', {cssClass: 'alert-success'});
      this.store.dispatch(go(['/metadata/list'], { created: 'true' }));
    }, (error) => this.flashMessagesService.show(JSON.parse(error._body).errors[0].detail, {cssClass: 'alert-danger'}));
  }

  updateMetadata(params, metadata: Metadata){
    this.metadataService.updateMetadata(params, metadata).subscribe((data) =>  {
      this.flashMessagesService.show('Metadata updated successfully', {cssClass: 'alert-success'});
      this.store.dispatch(go(['/metadata/list'], { created: 'true' }));
    }, (error) => this.flashMessagesService.show(JSON.parse(error._body).errors[0].detail, {cssClass: 'alert-danger'}));
  }

  loadMetadata(params) {
    this.metadataService.getMetadata(params).subscribe((data) => this.store.dispatch(new ObtainMetadata(data)))
  }

}
