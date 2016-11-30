import { ComponentsModule } from './../../components/index';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, NgModule, } from '@angular/core';
import { Angular2DataTableModule } from 'angular2-data-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRoute, Router, Routes } from '@angular/router';


@Component({
  selector: 'app-metadata',
  templateUrl: `<router-outlet></router-outlet>`
})
export class MetadataComponent{

  constructor() { }
}

export const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: ListComponent },
  { path: 'create', component: CreateComponent },
];

@NgModule({
  declarations: [
    MetadataComponent,
    ListComponent,
    CreateComponent
  ],
  exports: [
    MetadataComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    Angular2DataTableModule,
    NgbModule,
    ComponentsModule
  ]
})
export class MetadataModule { }
