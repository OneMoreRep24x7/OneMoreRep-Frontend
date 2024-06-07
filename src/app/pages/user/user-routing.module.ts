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
import { TrackingDetailsComponent } from './tracking-details/tracking-details.component';
import { CaloriesEatenComponent } from './calories-eaten/calories-eaten.component';
import { CaloriesBurnedComponent } from './calories-burned/calories-burned.component';
import { WaterIntakeComponent } from './water-intake/water-intake.component';
import { WeightTrackingComponent } from './weight-tracking/weight-tracking.component';
import { FoodDetailsComponent } from './food-details/food-details.component';
import { TrainerWorkoutplanComponent } from './trainer-workoutplan/trainer-workoutplan.component';
import { TrainerDietplanComponent } from './trainer-dietplan/trainer-dietplan.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { canDeactivateGuard } from '../../Guards/guards';


const routes: Routes = [
  {path:'',component:UserdashboardComponent},
  {path:'profile',component:UserprofileComponent},
  {path:'addProfile',component:AdduserprofileComponent},
  {path:'payment',component:PaymentComponent,canDeactivate: [canDeactivateGuard]},
  {path:'viewTrainer/:id',component:ViewtrainerComponent},
  {path:'showPlans',component:ShowplansComponent,canDeactivate: [canDeactivateGuard]},
  {path:'paymentSuccess',component:PaymentsuccessComponent},
  {path:'showTrainers',component:ShowtrainersComponent},
  {path:'trainerPayment',component:TrainerPaymentComponent},
  {path:'trainerConnect',component:ConnectTrainerComponent},
  {path:'tracking',component:TrackingComponent},
  {path:'trackingDeatils',component:TrackingDetailsComponent},
  {path:'caloriesEaten',component:CaloriesEatenComponent},
  {path:'caloriesBurned',component:CaloriesBurnedComponent},
  {path:'waterIntake',component:WaterIntakeComponent},
  {path:'weightTracking',component:WeightTrackingComponent},
  {path:'foodDetails/:id',component:FoodDetailsComponent},
  {path:'workoutPlans',component:TrainerWorkoutplanComponent},
  {path:'dietPlans',component:TrainerDietplanComponent},
  {path:'videoCall',component:VideoCallComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
