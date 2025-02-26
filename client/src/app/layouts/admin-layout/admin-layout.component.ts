import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [LoginComponent, AdminComponent, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {}
