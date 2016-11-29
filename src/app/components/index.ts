import { Headers } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';


export const COMPONENTS = [
  HeaderComponent
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
