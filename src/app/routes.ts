import { Routes } from '@angular/router';
import {LoggedInGuard} from './guards/logged-in.guard';
import {
  routes as metadataChildRoutes,
  MetadataComponent
} from './pages/metadata/metadata.component';

export const routes: Routes = [
  { path: '', redirectTo: 'metadata', pathMatch: 'full' },
  { path: 'metadata', component: MetadataComponent, children: metadataChildRoutes, canActivate: [LoggedInGuard] }
];
