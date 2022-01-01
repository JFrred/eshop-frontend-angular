import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = environment.tokenKey;
const USER_KEY = environment.userKey;
const ADMIN_KEY = environment.adminKey;

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  public signOut(): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getRole(): any {
    return window.sessionStorage.getItem(ADMIN_KEY);
  }

  public saveRole(isAdmin: boolean): void {
    window.sessionStorage.removeItem(ADMIN_KEY);
    window.sessionStorage.setItem(ADMIN_KEY, String(isAdmin));
  }
}
