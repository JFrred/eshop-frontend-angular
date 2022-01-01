import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentDetails } from '../models/payment-details';
import { PaymentService } from '../services/payment-service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  paymentDetails!: PaymentDetails;

  constructor(private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.paymentService.get(id)
      .subscribe(
        response => this.paymentDetails = response,
        error => console.log(error)
      )
  }
}
