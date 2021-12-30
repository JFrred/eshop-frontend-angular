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
    this.authService.isAdmin();
    this.isLogged = this.authService.isUserLoggedIn();
  }

  ngOnInit(): void {
    this.isUserAdmin();
  }

  // public isLoggedIn(): void {
  //   this.isLogged = this.authService.isUserLoggedIn();
  // }

  //todo: admin board -> product mgmt 
  public isUserAdmin(): void {
    this.authService.isAdmin().subscribe(
      response => {
        this.isAdmin = response;
        console.log("admin: " + this.isAdmin);
      }
    );
  }

  public logOut(): void {
    this.authService.logOut();
    this.isLogged = false;
    this.router.navigate(["/"]);
  }
}
