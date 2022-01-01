import { Injectable, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthResponse } from "../login/auth.response";
import { TokenStorageService } from "./token-storage.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { SignupRequest } from "../signup/signup.request";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  url = environment.baseUrl + "/auth";

  constructor(private http: HttpClient,
    private tokenService: TokenStorageService) { }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponse>(`${this.url}/perform_login`,
        { username, password });
  }
  
  logOut() {
    this.tokenService.signOut();
    window.sessionStorage.clear();
  }
  
  signup(signupRequest: SignupRequest): Observable<any> {
    console.log("request: " + signupRequest);

    return this.http.post<any>(
      `${this.url}/perform_signup`,
      signupRequest);
  }
  
  activateAccount(token: string): Observable<any> {
    return this.http.post<any>(
      `${this.url}/account-verification?token=${token}`,
      null);
  }

  isUserLoggedIn() {
    return this.tokenService.getToken() != null;
  }

  isUserAdmin(): boolean {
    const token = this.tokenService.getToken();
    if (token){
      const decodedToken = atob(token.split('.')[1]);
      const isAdmin = decodedToken.substring(7).split(',')[1].split(":")[1];
      return isAdmin == "true";
    }
    return false;
  }

}
