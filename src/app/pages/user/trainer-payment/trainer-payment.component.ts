import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trainer-payment',
  templateUrl: './trainer-payment.component.html',
  styleUrl: './trainer-payment.component.scss'
})
export class TrainerPaymentComponent implements OnInit{
  paymentId:string|null;
  amount:number;

  constructor(
    private route: ActivatedRoute){}

  ngOnInit(): void {
    window.scrollTo(0, 0); 
    this.route.params.subscribe(params => {
      this.paymentId = params['orderId'];
      console.log('Order ID:', this.paymentId);
    });
  }
}
