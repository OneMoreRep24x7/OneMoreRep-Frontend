import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerdashboardComponent } from './trainerdashboard/trainerdashboard.component';
import { TrainerRegisterComponent } from '../auth/trainer-register/trainer-register.component';
import { TrainerprofileComponent } from './trainerprofile/trainerprofile.component';
import { AddprofileComponent } from './addprofile/addprofile.component';
import { ShowClientsComponent } from './show-clients/show-clients.component';
import { ClientPlansComponent } from './client-plans/client-plans.component';
import { ClientWorkoutComponent } from './client-workout/client-workout.component';


const routes: Routes = [
  {path:'',component:TrainerdashboardComponent},
  {path:'register',component:TrainerRegisterComponent},
  {path:'profile',component:TrainerprofileComponent},
  {path:'addProfile',component:AddprofileComponent},
  {path:'showClients',component:ShowClientsComponent},
  {path:'clientPlans',component:ClientPlansComponent},
  {path:'clientWorkout',component:ClientWorkoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { 

}
