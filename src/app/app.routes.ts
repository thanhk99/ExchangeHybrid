import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { Security } from './security/security.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DeviceManagement } from './device-management/device-management';
import { Assetpage } from './assetpage/assetpage';
import { FundingWallet } from './funding-wallet/funding-wallet';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RechargeWalletComponent } from './recharge-wallet/recharge-wallet.component';
import { ConvertWalletComponent } from './convert-wallet/convert-wallet.component';
import { WithdrawalWalletComponent } from './withdrawal-wallet/withdrawal-wallet.component';
import { TransferWalletComponent } from './transfer-wallet/transfer-wallet.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'security', component: Security },
  { path: 'device-management', component: DeviceManagement },
  { path: 'assetpage', component: Assetpage },
  { path: 'funding-wallet/recharge', component: RechargeWalletComponent },
  { path: 'funding-wallet/convert', component: ConvertWalletComponent },
  { path: 'funding-wallet/withdrawal', component: WithdrawalWalletComponent },
  { path: 'funding-wallet/transfer', component: TransferWalletComponent },
  {path: 'funding-wallet',component: FundingWallet,},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  
];
