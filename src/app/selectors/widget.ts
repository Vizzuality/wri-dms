import { IWidget } from './../models/widget';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { State } from '../reducers';
import { State as WidgetState } from '../reducers/widget';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class WidgetSelector {

  constructor(private store: Store<State>){}

  getWidgets(): Observable<IWidget[]> {
    return this.store.select( state => state.widget.entities);
  }

  getWidgetState(): Observable<WidgetState> {
    return this.store.select( state => state.widget);
  }

}
