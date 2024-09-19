import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailUserComponent } from './pages/detail-user/detail-user.component';


export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'detail/:id/:method', component: DetailUserComponent},
    // {path: 'add', component: DetailUserComponent},
    {path: '404', component: NotFoundComponent},
    {path: '**', redirectTo: '404',pathMatch: 'full'}
];
