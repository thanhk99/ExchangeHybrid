import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';


export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'header', component: HeaderComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }  

];
