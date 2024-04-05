import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { UserdashboardComponent } from './pages/user/userdashboard/userdashboard.component';
import { TrainerdashboardComponent } from './pages/trainer/trainerdashboard/trainerdashboard.component';
import { OtpComponent } from './pages/auth/otp/otp.component';
import { TrainerRegisterComponent } from './pages/auth/trainer-register/trainer-register.component';
import { AdmindashboardComponent } from './pages/admin/admindashboard/admindashboard.component';
import { UserprofileComponent } from './pages/user/userprofile/userprofile.component';
import { TrainerprofileComponent } from './pages/trainer/trainerprofile/trainerprofile.component';
import { AdduserprofileComponent } from './pages/user/adduserprofile/adduserprofile.component';
import { WorkoutComponent } from './pages/admin/workout/workout.component';
import { ViewworkoutComponent } from './pages/admin/viewworkout/viewworkout.component';
import { AddworkoutComponent } from './pages/admin/addworkout/addworkout.component';
import { RecipeComponent } from './pages/admin/recipe/recipe.component';
import { RecipevariantComponent } from './pages/admin/recipevariant/recipevariant.component';
import { AddrecipeComponent } from './pages/admin/addrecipe/addrecipe.component';
import { AddvariantComponent } from './pages/admin/addvariant/addvariant.component';
import { ViewfoodComponent } from './pages/admin/viewfood/viewfood.component';

const routes: Routes = [
  {path:'',component:UserdashboardComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'trainer',component:TrainerdashboardComponent},
  {path:'otp/:email',component:OtpComponent},
  {path:'trainer/register',component:TrainerRegisterComponent},
  {path:'admin',component:AdmindashboardComponent},
  {path:'admin/workout',component:WorkoutComponent},
  {path:'admin/viewWorkout',component:ViewworkoutComponent},
  {path:'admin/addWorkout',component:AddworkoutComponent},
  {path:'admin/recipe',component:RecipeComponent},
  {path:'admin/recipeVariant',component:RecipevariantComponent},
  {path:'admin/addRecipe',component:AddrecipeComponent},
  {path:'admin/addFoodVariant',component:AddvariantComponent},
  {path:'admin/viewFood/:id',component:ViewfoodComponent},
  {path:'user/profile',component:UserprofileComponent},
  {path:'user/addProfile',component:AdduserprofileComponent},
  {path:'trainer/profile',component:TrainerprofileComponent},
  { path: 'admin', loadChildren: () => import('./pages/admin/admin/admin.module').then(m => m.AdminModule) }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
