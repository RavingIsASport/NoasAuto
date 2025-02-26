import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SigninService } from '../../../services/signin.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private signIn: SigninService, private router: Router) {}
  errorMsg: string = '';
  err: boolean = false;

  // login form
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  // login method
  async login() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;

    // call the signIn service
    try {
      let response = await this.signIn.signIn(username, password);

      if (!response) {
        throw new Error('Login failed');
      }

      localStorage.setItem('authToken', response.token);

      console.log('Login successful');
      this.router.navigate(['admin/home']);
    } catch (error) {
      console.log(error);
      this.errorMsg = 'Incorrect username or password';
      this.err = true;
    }
  }
}
