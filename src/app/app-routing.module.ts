import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { OtpComponent } from './pages/auth/otp/otp.component';
import { RoomComponent } from './pages/auth/room/room.component';
import { AuthGuard } from './Guards/guards';




const routes: Routes = [
  
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  
  {path:'otp/:email',component:OtpComponent},
  { path: 'room/:roomId', component: RoomComponent },
  
  {
     path: 'admin',canActivate: [AuthGuard],
      loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { 
    path: 'user',canActivate: [AuthGuard],
     loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) 
    },
    { path: '', redirectTo: '/user', pathMatch: 'full' },
  
  {
     path: 'trainer', canActivate: [AuthGuard],
      loadChildren: () => import('./pages/trainer/trainer.module').then(m => m.TrainerModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
