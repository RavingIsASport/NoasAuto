import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminComponent } from './layouts/admin-layout/admin/admin.component';
import { LoginComponent } from './layouts/admin-layout/login/login.component';
import { HomeComponent } from './layouts/main-layout/home/home.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'home', component: AdminComponent, canActivate: [AuthGuard] },
    ],
  },
];
