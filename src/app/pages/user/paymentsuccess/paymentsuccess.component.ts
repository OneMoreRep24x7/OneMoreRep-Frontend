import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrl: './paymentsuccess.component.scss'
})
export class PaymentsuccessComponent implements OnInit {
  paymentId:string|null;
  amount:number;

  constructor(
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.paymentId = params['orderId'];
      console.log('Order ID:', this.paymentId);
    });
  }

}
