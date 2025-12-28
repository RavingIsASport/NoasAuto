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
import CarPageComponent from './layouts/main-layout/car-page/car-page.component';
import { FinanceComponent } from './layouts/main-layout/finance/finance.component';

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
        title: 'Noas Auto Sales | Home',
      },
      {
        path: 'inventory',
        component: InventoryComponent,
        title: 'Noas Auto Sales | Inventory',
      },
      {
        path: 'inventory/:id',
        component: CarPageComponent,
        title: 'Noas Auto Sales | Car',
      },
      {
        path: 'finance',
        component: FinanceComponent,
        title: 'Noas Auto Sales | Finance',
      },
      {
        path: 'contact',
        component: ContactComponent,
        title: 'Noas Auto Sales | Contact',
      },
    ],
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Noas Auto Sales | Admin',
      },
      {
        path: 'home',
        component: AdminComponent,
        canActivate: [AuthGuard],
        title: 'Noas Auto Sales | Admin',
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
