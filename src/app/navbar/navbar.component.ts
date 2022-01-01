import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username!: string;
  isLogged!: boolean;
  isAdmin!: boolean;

  constructor(public authService: AuthenticationService,
    private router: Router) {
      this.isLogged = this.authService.isUserLoggedIn();
      this.isAdmin = this.authService.isUserAdmin();
      console.log("admin: " + this.authService.isUserAdmin());    
  }

  ngOnInit(): void {
  
  }

  public logOut(): void {
    this.authService.logOut();
    this.isLogged = false;
    this.router.navigateByUrl('');
  }
}
