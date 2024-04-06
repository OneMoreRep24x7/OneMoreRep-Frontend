import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { TrainerprofileComponent } from './trainerprofile/trainerprofile.component';
import { TrainerdashboardComponent } from './trainerdashboard/trainerdashboard.component';
import { TrainerRegisterComponent } from '../auth/trainer-register/trainer-register.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from '../../shared/carousel/carousel.module';



@NgModule({
  declarations: [
    TrainerprofileComponent, 
    TrainerdashboardComponent,
    TrainerRegisterComponent,
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule
    
  ]
})
export class TrainerModule { }
