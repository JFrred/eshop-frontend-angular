import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogged!: boolean;
  isAdmin!: boolean;

  constructor(public authService: AuthenticationService,
    private router: Router) {
    this.isLogged = this.authService.isUserLoggedIn();
  }

  ngOnInit(): void {
    this.isUserAdmin();
    console.log("admin: " + this.isAdmin);
  }

  public isUserAdmin(): void {
    if (this.isLogged) {
      this.authService.getUserRole().subscribe(
        response => {
          this.isAdmin = response == "ADMIN";
          console.log("admin: " + this.isAdmin);
        },
        error => console.log(error)
      );
    }
  }

  public logOut(): void {
    this.authService.logOut();
    this.isLogged = false;
    this.router.navigate(["/"]);
  }
}
