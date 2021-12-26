import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogged!: boolean;

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  public isLoggedIn(): void {
    this.isLogged = this.authService.isUserLoggedIn();
  }

}
