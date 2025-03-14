import { Routes } from '@angular/router';
// layout components
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

// admin components
import { AdminComponent } from './layouts/admin-layout/admin/admin.component';
import { LoginComponent } from './layouts/admin-layout/login/login.component';
import { AuthGuard } from './auth.guard';

// main components
import { HomeComponent } from './layouts/main-layout/home/home.component';
import { InventoryComponent } from './layouts/main-layout/inventory/inventory.component';
import { ContactComponent } from './layouts/main-layout/contact/contact.component';
import { CarPageComponent } from './layouts/main-layout/car-page/car-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'inventory',
        component: InventoryComponent,
      },
      {
        path: 'inventory/:id',
        component: CarPageComponent,
      },

      {
        path: 'contact',
        component: ContactComponent,
      },
    ],
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'home', component: AdminComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
