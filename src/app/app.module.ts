import { reduce } from 'rxjs/operator/reduce';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, RequestOptions } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesModule } from 'angular2-flash-messages';

import 'rxjs/Rx';

import {
  RouterModule,
  Router,
  Routes
} from '@angular/router';
import {
  LocationStrategy,
  PathLocationStrategy,
  HashLocationStrategy,
  APP_BASE_HREF
} from '@angular/common';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components';


/*
 * Services
 */
import {SERVICES} from './services';
import {ACTIONS} from './actions';
import {SELECTORS} from './selectors';
import {LoggedInGuard} from './guards/logged-in.guard';
import { OauthRequestOptions } from './services/oauth-requestoptions.service';

import { routes } from './routes';
import { reducer } from './reducers';
import { MetadataModule } from './pages/metadata/metadata.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ComponentsModule,
    RouterModule.forRoot(routes),
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    NgbModule.forRoot(),
    FlashMessagesModule,
    MetadataModule
  ],
  providers: [
    SERVICES,
    ACTIONS,
    SELECTORS,
    LoggedInGuard,
    { provide: RequestOptions, useClass: OauthRequestOptions },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
