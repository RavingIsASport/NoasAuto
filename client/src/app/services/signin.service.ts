import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  constructor() {}

  async signIn(username: string, password: string) {
    let user = {
      username: username,
      password: password,
    };
    try {
      let response = await fetch('http://localhost:3001/api/signin', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
