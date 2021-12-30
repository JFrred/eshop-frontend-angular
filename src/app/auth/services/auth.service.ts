import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthResponse } from "../login/auth.response";
import { TokenStorageService } from "./token-storage.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { SignupRequest } from "../signup/signup.request";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  url = environment.baseUrl + "/auth";

  constructor(private http: HttpClient,
    private tokenService: TokenStorageService) { }

  authenticate(username: string, password: string) {
    return this.http
      .post<AuthResponse>(`${this.url}/perform_login`,
        { username, password });
  }

  isUserLoggedIn() {
    console.log("is logged");
    return this.tokenService.getToken() != null;
  }

  logOut() {
    this.tokenService.signOut();
  }

  register(signupRequest: SignupRequest): Observable<any> {
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

  isAdmin(): Observable<any> {
    return this.http.get<any>(`${this.url}/user/role`);
  }
}
