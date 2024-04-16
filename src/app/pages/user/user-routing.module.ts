import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AdduserprofileComponent } from './adduserprofile/adduserprofile.component';
import { PaymentComponent } from './payment/payment.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { ViewtrainerComponent } from './viewtrainer/viewtrainer.component';
import { ShowplansComponent } from './showplans/showplans.component';
import { PaymentsuccessComponent } from './paymentsuccess/paymentsuccess.component';
import { ShowtrainersComponent } from './showtrainers/showtrainers.component';
import { TrainerPaymentComponent } from './trainer-payment/trainer-payment.component';
import { ConnectTrainerComponent } from './connect-trainer/connect-trainer.component';
import { TrackingComponent } from './tracking/tracking.component';


const routes: Routes = [
  {path:'',component:UserdashboardComponent},
  {path:'profile',component:UserprofileComponent},
  {path:'addProfile',component:AdduserprofileComponent},
  {path:'payment',component:PaymentComponent},
  {path:'viewTrainer/:id',component:ViewtrainerComponent},
  {path:'showPlans',component:ShowplansComponent},
  {path:'paymentSuccess',component:PaymentsuccessComponent},
  {path:'showTrainers',component:ShowtrainersComponent},
  {path:'trainerPayment',component:TrainerPaymentComponent},
  {path:'trainerConnect',component:ConnectTrainerComponent},
  {path:'tracking',component:TrackingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
