import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  errorMessage!: string;
  hide = true;
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      accountNumber: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
  }

  signup(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;


    //todo: show server side validation exception message
    this.authService.register(this.form.value)
      .subscribe(
        response => {
          console.log(response.message);
        },
        error => {
          this.errorMessage = error.message;

          if (error instanceof HttpErrorResponse) {
            if (error.error instanceof ErrorEvent) {
              console.error("Error Event");
            } else {
              console.log(`error status : ${error.status} ${error.statusText}`);
              switch (error.status) {
                case 422:      
                  this.router.navigateByUrl("/signup");
                  break;
              }
            }
          } else {
            console.error("some thing else happened");
          }
        }
      );

    if (this.errorMessage != null) {
      this.router.navigate(['/register']);
    }
    this.router.navigate(['/login']);
  }

  get f() { return this.form.controls; }
}