import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { Security } from './security/security.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DeviceManagement } from './device-management/device-management';
import { Assetpage } from './assetpage/assetpage';
import { FundingWallet } from './funding-wallet/funding-wallet';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'security', component: Security },
  { path: 'device-management', component: DeviceManagement },
  { path: 'assetpage', component: Assetpage },
  { path: 'funding-wallet', component: FundingWallet },
  { path: 'register', component: RegisterComponent },
  { path: 'loginPage', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
