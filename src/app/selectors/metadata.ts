import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { State } from '../reducers';

@Injectable()
export class MetadataSelector {

  constructor(private store: Store<State>){}

  getMetadata(){
    return this.store.select( state => state.metadata.entities);
  }

  getEdit(){
    return this.store.select( state => state.metadata.edit).map(el => {
      if (el && el.id) {
        let newElement = {
          id: el.id
        };
        return Object.assign({}, newElement, el.attributes);
      }
      return {};
    } );
  }

}
