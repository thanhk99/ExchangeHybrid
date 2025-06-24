import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { Security } from './security/security.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DeviceManagement } from './device-management/device-management';
import { Component } from '@angular/core';
import { LoginRegister } from './login-register/login-register';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'security', component: Security },
  { path: 'device-management', component: DeviceManagement },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: 'login-register', component: LoginRegister },
];
