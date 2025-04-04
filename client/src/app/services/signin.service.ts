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
      let response = await fetch(
        'https://backend-production-136c.up.railway.app/api/signin',
        {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      let data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
