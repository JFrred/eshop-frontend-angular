import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private tokenService: TokenStorageService,
    private router: Router) { }

  public canActivate(){
    let isAdmin = this.tokenService.getRole();
    if(isAdmin == "true"){
      return true;
    }

    this.router.navigateByUrl("/");
    return false;
  }
}