import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{
  title = 'Bikecycle shop';
  subtitle = 'What are you looking for?';
  message!: string ;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      param => {
        this.message = param['message'];
        console.log("home message: " + this.message);
      },
      error => console.log(error)
    )
  }
}