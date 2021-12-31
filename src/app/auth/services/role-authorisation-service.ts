import { Injectable } from "@angular/core";
import { TokenStorageService } from "./token-storage.service";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class RoleAuthorisationService {

    constructor(private tokenService: TokenStorageService,
        private jwtHelper: JwtHelperService) { }

    public isAuthorised(): boolean {
        const token = this.tokenService.getToken();
        if (!token)
            return false;
        const payload = token.split('.')[1];
        const decoded = window.atob(payload)
        const values = JSON.parse(decoded);
        const roles = values.sub;
        if (roles.indexOf('ROLE_ADMIN') < 0) {
            return false;
        }
        return true;
    }

}