import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../auth/services/auth.service';
import { TokenStorageService } from '../auth/services/token-storage.service'; 

@Injectable({
  providedIn: 'root'
})
export class UserRouteGuardService implements CanActivate {

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  public canActivate(){
    if(!this.authService.isUserLoggedIn() || (this.authService.isUserLoggedIn() && this.authService.isUserAdmin())){
        this.router.navigateByUrl("/");
    }

    return true;
  }
}