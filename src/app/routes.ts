import { MetadataComponent } from './metadata/metadata.component';
import { Routes } from '@angular/router';
import {LoggedInGuard} from './guards/logged-in.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'metadata', pathMatch: 'full' },
  { path: 'metadata', component: MetadataComponent, canActivate: [LoggedInGuard] }
];
