import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AdduserprofileComponent } from './adduserprofile/adduserprofile.component';
import { PaymentComponent } from './payment/payment.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';


const routes: Routes = [
  {path:'',component:UserdashboardComponent},
  {path:'profile',component:UserprofileComponent},
  {path:'addProfile',component:AdduserprofileComponent},
  {path:'payment',component:PaymentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
