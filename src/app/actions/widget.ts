import { WidgetService } from './../services/widget.service';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { State } from '../reducers';


export enum WidgetActions {
  WIDGET_SEARCH,
  WIDGET_LOADING
};

export class SearchAction implements Action {
  type = WidgetActions[WidgetActions.WIDGET_SEARCH];

  constructor(public payload?: any) { }
}

export class LoadingAction implements Action {
  type = WidgetActions[WidgetActions.WIDGET_LOADING];

  constructor(public payload: boolean) { }
}

export type Actions = SearchAction;

@Injectable()
export class WidgetAction {

  constructor(private widgetService: WidgetService, private store: Store<State>){

  }
  searchWidgets(term: string){
    this.widgetService.getWidgets(term).do(x => console.log(x)).subscribe(data => this.store.dispatch(new SearchAction(data)));
  }

  loadingWidgets(){
    this.store.dispatch(new LoadingAction(true));
  }

}
