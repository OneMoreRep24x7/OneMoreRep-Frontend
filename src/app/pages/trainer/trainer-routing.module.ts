import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerdashboardComponent } from './trainerdashboard/trainerdashboard.component';
import { TrainerRegisterComponent } from '../auth/trainer-register/trainer-register.component';
import { TrainerprofileComponent } from './trainerprofile/trainerprofile.component';


const routes: Routes = [
  {path:'',component:TrainerdashboardComponent},
  {path:'register',component:TrainerRegisterComponent},
  {path:'profile',component:TrainerprofileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }
