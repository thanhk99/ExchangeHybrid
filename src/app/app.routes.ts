import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { Security } from './security/security.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
    { path: 'profile', component: ProfileComponent },
    { path: 'security', component: Security },
    { path: '', component: HomepageComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

