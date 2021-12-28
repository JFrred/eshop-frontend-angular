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
    return this.tokenService.getToken() != null;
  }

  logOut() {
    this.tokenService.signOut();
  }

  register(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(
      `${this.url}/perform_signup`,
      signupRequest,
      httpOptions);
  }
}
