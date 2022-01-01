import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../services/auth.service";
import { TokenStorageService } from "../services/token-storage.service";
import { AuthResponse } from './auth.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private router: Router,
              private authService: AuthenticationService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log("auth token: " + this.tokenStorage.getToken() == null);
      this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.authenticate(username, password).subscribe(
      (response: AuthResponse) => {
        console.log("token: " + response.token);

        this.tokenStorage.saveToken(response.token);
        this.tokenStorage.saveUser(response.username);
        this.tokenStorage.saveRole(this.authService.isUserAdmin());

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;

        
        this.router.navigate(['/', ])
      },
      (error: Error) => {
        this.errorMessage = error.message;
        this.isLoginFailed = true;
      }
    );

  }

  reloadPage(): void {
    window.location.reload();
  }
}
