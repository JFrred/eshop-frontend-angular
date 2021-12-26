import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthResponse } from "../login/auth.response";
import { TokenStorageService } from "./token-storage.service";

export class User {
  constructor(public status: string) { }
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient,
    private tokenService: TokenStorageService) { }

  authenticate(username: string, password: string) {
    return this.httpClient
      .post<AuthResponse>("http://localhost:8080/auth/perform_login",
        { username, password });
  }

  isUserLoggedIn() {
    return this.tokenService.getToken() != null;
  }

  logOut() {
    this.tokenService.signOut();
  }
}
