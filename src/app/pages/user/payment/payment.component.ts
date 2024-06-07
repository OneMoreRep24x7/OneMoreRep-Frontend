import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/User.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  user:User|null;
  userId:string;

  ngOnInit(): void {
    window.scrollTo(0, 0);  
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.userId = this.user.id;
  }

  checkCondition(): boolean {
   
    const trailValidDate = new Date(this.user.trialValid);
    const currentDate = new Date();
    if (currentDate > trailValidDate) {
       return false;
    }
    return true;
  }


}
