import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AdduserprofileComponent } from './adduserprofile/adduserprofile.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { PaymentComponent } from './payment/payment.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdduserprofileComponent,
    UserprofileComponent,
    PaymentComponent,
    UserdashboardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class UserModule { }
