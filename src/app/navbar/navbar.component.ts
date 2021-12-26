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

  constructor(public authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  public isLoggedIn(): void {
    this.isLogged = this.authService.isUserLoggedIn();
  }

  public logOut(): void {
    this.authService.logOut();
    this.isLogged = false;
    this.router.navigate(["/"]);
  }
}
