import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  loginForm!: FormGroup;

  submitted!: boolean;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log("auth token: " + this.tokenStorage.getToken() == null);
      this.isLoggedIn = true;
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  
  }

  onSubmit(): void {
    this.submitted = true;
   
    if (this.loginForm.invalid)
      return;


    this.authService.login(this.loginForm.value).subscribe(
      (response: AuthResponse) => {
        console.log("token: " + response.token);

        this.tokenStorage.saveToken(response.token);
        this.tokenStorage.saveUser(response.username);
        this.tokenStorage.saveRole(this.authService.isUserAdmin());

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      },
      (error: Error) => {
        this.errorMessage = error.name;
        this.isLoginFailed = true;
      }
    );

  }

  get f() { return this.loginForm.controls; }

  reloadPage(): void {
    window.location.reload();
  }
}
