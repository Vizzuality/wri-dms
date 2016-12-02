import { KeysPipe } from './keys.pipe';
import { CardComponent } from './card/card.component';
import { Headers } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';


export const COMPONENTS = [
  HeaderComponent,
  CardComponent,
  KeysPipe
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
