import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { authGuard, dontGoBack } from './auth.guardFn';

export const routes: Routes = [
    {path:'',redirectTo: '/login', pathMatch: 'full'},
    {path: "login", component:LoginComponent, canActivate:[dontGoBack]},
    {path: "register", component:RegisterComponent, canActivate:[dontGoBack]},
    {path:'home', component:HomeComponent, canActivate:[authGuard]},
    {path:'admin-dashboard', component:AdminDashboardComponent, canActivate:[authGuard]},
    {path: '**', redirectTo: '/login' },
];
