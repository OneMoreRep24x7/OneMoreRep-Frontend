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
import { TrackingDetailsComponent } from './tracking-details/tracking-details.component';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { CaloriesEatenComponent } from './calories-eaten/calories-eaten.component';
import { CaloriesBurnedComponent } from './calories-burned/calories-burned.component';
import { WaterIntakeComponent } from './water-intake/water-intake.component';
import { WeightTrackingComponent } from './weight-tracking/weight-tracking.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FoodDetailsComponent } from './food-details/food-details.component';
import { TrainerWorkoutplanComponent } from './trainer-workoutplan/trainer-workoutplan.component';
import { CalendarModule } from 'primeng/calendar';








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
    TrackingComponent,
    TrackingDetailsComponent,
    CaloriesEatenComponent,
    CaloriesBurnedComponent,
    WaterIntakeComponent,
    WeightTrackingComponent,
    FoodDetailsComponent,
    TrainerWorkoutplanComponent,

    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    ChartModule,
    ProgressBarModule,
    NgCircleProgressModule.forRoot({
      "backgroundPadding":15,
      "unitsFontSize":'25',
      "subtitleFontSize":'16',
      "backgroundColor": "#f57d00",
      "radius": 90,
      "toFixed": 0,
      "maxPercent": 100,
      "units": "Calories",
      "unitsColor": "#483500",
      "outerStrokeWidth": 2,
      "titleColor": "#483500",
      "subtitleColor": "#483500",
      "showInnerStroke": false,
      "responsive": false}),
      CalendarModule
    
  ]
})
export class UserModule { }
