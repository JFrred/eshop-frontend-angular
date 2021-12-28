import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  errors!: any;
  hide = true;
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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

  //todo: after successfull registration redirect user to confirm email page and wait for confirmation
  signup(): void {
    this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    this.loading = true;

    // let request = new SignupRequest(
    //   this.form.username,
    //   this.form.value.password,
    //   this.form.value.confirmPassword,
    //   this.form.value.firstName,
    //   this.form.value.lastName,
    //   this.form.value.em,
    //   this.form.value.,
    //   this.form.value.username,
    //   );

    console.log("form: " + this.form.value.username);
    this.authService.register(this.form.value)
    .pipe(first())
      .subscribe(
        response => {
          this.router.navigate(['/confirm-email']); // loading = true ??
        },
        error => this.errors = error
      );

  }

  get f() { return this.form.controls; }
}