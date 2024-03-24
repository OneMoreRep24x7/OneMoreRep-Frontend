import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { NavabarComponent } from './components/common/navabar/navabar.component';
import { TrainerdashboardComponent } from './components/trainerdashboard/trainerdashboard.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {path:'',component:HeaderComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'userdashboard',component:UserdashboardComponent},
  {path:'trainer',component:TrainerdashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
