import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { DetailUserComponent } from './pages/detail-user/detail-user/detail-user.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'detail/:id/:method', component: DetailUserComponent},
    {path: '404', component: NotFoundComponent},
    {path: '**', redirectTo: '',pathMatch: 'full'}
];
