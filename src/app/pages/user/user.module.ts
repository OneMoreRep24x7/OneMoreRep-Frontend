import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AdduserprofileComponent } from './adduserprofile/adduserprofile.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { PaymentComponent } from './payment/payment.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewtrainerComponent } from './viewtrainer/viewtrainer.component';
import { CarouselModule } from '../../shared/carousel/carousel.module';
import { ShowplansComponent } from './showplans/showplans.component';
import { PaymentsuccessComponent } from './paymentsuccess/paymentsuccess.component';
import { ShowtrainersComponent } from './showtrainers/showtrainers.component';
import { TrainerPaymentComponent } from './trainer-payment/trainer-payment.component';
import { ConnectTrainerComponent } from './connect-trainer/connect-trainer.component';
import { TrackingComponent } from './tracking/tracking.component';




@NgModule({
  declarations: [
    AdduserprofileComponent,
    UserprofileComponent,
    PaymentComponent,
    UserdashboardComponent,
    ViewtrainerComponent,
    ShowplansComponent,
    PaymentsuccessComponent,
    ShowtrainersComponent,
    TrainerPaymentComponent,
    ConnectTrainerComponent,
    TrackingComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    
  ]
})
export class UserModule { }
