import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { TrainerprofileComponent } from './trainerprofile/trainerprofile.component';
import { TrainerdashboardComponent } from './trainerdashboard/trainerdashboard.component';
import { TrainerRegisterComponent } from '../auth/trainer-register/trainer-register.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from '../../shared/carousel/carousel.module';
import { AddprofileComponent } from './addprofile/addprofile.component';
import { CertificateModalComponent } from './certificate-modal/certificate-modal.component';
import { ShowClientsComponent } from './show-clients/show-clients.component';
import { ClientPlansComponent } from './client-plans/client-plans.component';
import { ClientWorkoutComponent } from './client-workout/client-workout.component';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { AddDailyworkoutComponent } from './add-dailyworkout/add-dailyworkout.component';
import { DialogModule } from 'primeng/dialog';
import { ShowWorkoutsComponent } from './show-workouts/show-workouts.component';
import { AddPlansComponent } from './add-plans/add-plans.component';



@NgModule({
  declarations: [
    TrainerprofileComponent, 
    TrainerdashboardComponent,
    TrainerRegisterComponent,
    AddprofileComponent,
    CertificateModalComponent,
    ShowClientsComponent,
    ClientPlansComponent,
    ClientWorkoutComponent,
    AddDailyworkoutComponent,
    ShowWorkoutsComponent,
    AddPlansComponent,
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    CalendarModule,
    ChartModule,
    DialogModule 
   
    
  ]
})
export class TrainerModule { }
