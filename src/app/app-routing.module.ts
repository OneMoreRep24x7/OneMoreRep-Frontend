import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { TrainerdashboardComponent } from './pages/trainer/trainerdashboard/trainerdashboard.component';
import { OtpComponent } from './pages/auth/otp/otp.component';
import { TrainerRegisterComponent } from './pages/auth/trainer-register/trainer-register.component';
import { TrainerprofileComponent } from './pages/trainer/trainerprofile/trainerprofile.component';



const routes: Routes = [
  
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  
  {path:'otp/:email',component:OtpComponent},
  
  {
     path: 'admin',
      loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { 
    path: 'user',
     loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) 
    },
    { path: '', redirectTo: '/user', pathMatch: 'full' },
  
  {
     path: 'trainer',
      loadChildren: () => import('./pages/trainer/trainer.module').then(m => m.TrainerModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
