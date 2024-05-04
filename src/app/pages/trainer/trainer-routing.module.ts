import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerdashboardComponent } from './trainerdashboard/trainerdashboard.component';
import { TrainerRegisterComponent } from '../auth/trainer-register/trainer-register.component';
import { TrainerprofileComponent } from './trainerprofile/trainerprofile.component';
import { AddprofileComponent } from './addprofile/addprofile.component';
import { ShowClientsComponent } from './show-clients/show-clients.component';
import { ClientPlansComponent } from './client-plans/client-plans.component';
import { ClientWorkoutComponent } from './client-workout/client-workout.component';
import { AddDailyworkoutComponent } from './add-dailyworkout/add-dailyworkout.component';
import { ShowWorkoutsComponent } from './show-workouts/show-workouts.component';
import { AddPlansComponent } from './add-plans/add-plans.component';
import { ConnectComponent } from './connect/connect.component';
import { ShowDailydietComponent } from './show-dailydiet/show-dailydiet.component';
import { AddDailydietComponent } from './add-dailydiet/add-dailydiet.component';
import { ClientDietComponent } from './client-diet/client-diet.component';
import { AddDietplansComponent } from './add-dietplans/add-dietplans.component';


const routes: Routes = [
  {path:'',component:TrainerdashboardComponent},
  {path:'register',component:TrainerRegisterComponent},
  {path:'profile',component:TrainerprofileComponent},
  {path:'addProfile',component:AddprofileComponent},
  {path:'showClients',component:ShowClientsComponent},
  {path:'clientPlans',component:ClientPlansComponent},
  {path:'clientWorkout',component:ClientWorkoutComponent},
  {path:'addDailyWorkout',component:AddDailyworkoutComponent},
  {path:'showDailyWorkouts',component:ShowWorkoutsComponent},
  {path:'addClientPlans',component:AddPlansComponent},
  {path:'connectClients',component:ConnectComponent},
  {path:'showDailyDiet',component:ShowDailydietComponent},
  {path:'addDailyDiet',component:AddDailydietComponent},
  {path:'clientDiet',component:ClientDietComponent},
  {path:'addClientDietPlans',component:AddDietplansComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { 

}
