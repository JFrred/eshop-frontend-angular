import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../auth/services/token-storage.service'; 

@Injectable({
  providedIn: 'root'
})
export class UserRouteGuardService implements CanActivate {

  constructor(private tokenService: TokenStorageService,
    private router: Router) { }

  public canActivate(){
    let isAdmin = this.tokenService.getRole();
    if(isAdmin == "true"){
        this.router.navigateByUrl("/");
    }

    return true;
  }
}