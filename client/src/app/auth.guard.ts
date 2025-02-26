import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if there is a valid token in localStorage (or sessionStorage)
    const token = localStorage.getItem('authToken');

    if (token) {
      // Token exists, user is authenticated
      return true;
    } else {
      // No token, redirect to login
      this.router.navigate(['admin/login']);
      return false;
    }
  }
}
