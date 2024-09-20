import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailUserComponent } from './pages/detail-user/detail-user.component';
import { LoginComponent } from './pages/login/login.component';


export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'detail/:id/:method', component: DetailUserComponent},
    {path: 'login', component: LoginComponent},
    {path: '404', component: NotFoundComponent},
    {path: '**', redirectTo: '404',pathMatch: 'full'}
];
