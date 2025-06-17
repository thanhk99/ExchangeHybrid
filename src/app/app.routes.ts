import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { Footer } from './footer/footer';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'header', component: HeaderComponent},
    {path: 'footer', component: Footer},
    { path: '**', redirectTo: '', pathMatch: 'full' }  

];
