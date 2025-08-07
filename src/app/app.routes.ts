import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { Security } from './security/security.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DeviceManagement } from './device-management/device-management';
import { Assetpage } from './assetpage/assetpage';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Buy } from './buy/buy';
import { P2pmarket } from './p2pmarket/p2pmarket';
import { Methodpayment } from './methodpayment/methodpayment';
import { SelectAdvertisement } from './select-advertisement/select-advertisement';
import { CreateAds } from './create-ads/create-ads';
import { Nextstep } from './create-ads/nextstep/nextstep';
import { MyTransaction } from './my-transaction/my-transaction';
import { MyProfile } from './my-profile/my-profile';
import { BigTransaction } from './big-transaction/big-transaction';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'security', component: Security },
    { path: 'device-management', component: DeviceManagement },
    { path: 'assetpage', component: Assetpage },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'buy', component: Buy },
    { path: 'p2pmarket', component: P2pmarket },
    { path: 'methodpayment', component: Methodpayment },
    { path: 'select-advertisement', component: SelectAdvertisement },
    { path: 'create-ads', component: CreateAds },
    { path: 'create-ads/nextstep', component: Nextstep },
    { path: 'my-transaction', component: MyTransaction },
    { path: 'my-profile', component: MyProfile },
    { path: 'big-transaction', component: BigTransaction },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
