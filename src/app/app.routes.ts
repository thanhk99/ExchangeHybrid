import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { Security } from './security/security.component';

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'security', component: Security }
];
