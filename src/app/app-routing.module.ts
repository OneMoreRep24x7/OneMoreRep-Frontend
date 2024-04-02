import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { TrainerdashboardComponent } from './components/trainerdashboard/trainerdashboard.component';
import { OtpComponent } from './components/otp/otp.component';
import { TrainerRegisterComponent } from './components/trainer-register/trainer-register.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { TrainerprofileComponent } from './components/trainerprofile/trainerprofile.component';
import { AdduserprofileComponent } from './components/adduserprofile/adduserprofile.component';

const routes: Routes = [
  {path:'',component:UserdashboardComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'trainer',component:TrainerdashboardComponent},
  {path:'otp/:email',component:OtpComponent},
  {path:'trainer/register',component:TrainerRegisterComponent},
  {path:'admin',component:AdmindashboardComponent},
  {path:'user/profile',component:UserprofileComponent},
  {path:'user/addProfile',component:AdduserprofileComponent},
  {path:'trainer/profile',component:TrainerprofileComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
