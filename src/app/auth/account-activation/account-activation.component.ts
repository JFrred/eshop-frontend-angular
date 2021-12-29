import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit {

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params: any) => {
        let token = params['token'];
        console.log("token: " + token); 

        this.authService.activateAccount(token).subscribe();
        console.log("account has been activated");
      });
  }

}
