import { Component } from '@angular/core';

@Component({
  selector: 'app-trainerdashboard',
  templateUrl: './trainerdashboard.component.html',
  styleUrl: './trainerdashboard.component.scss'
})
export class TrainerdashboardComponent {
  logoText:String = "Trainer"
  logoIcon:String = "T"
  navbarData = [
    {
      routerLink:"/trainer/profile",
      icon:'fas fa-user-circle',
      label: 'Profile'

    },
  
    {
      routerLink:"/trainer/payments",
      icon:'fas fa-wallet',
      label: 'Payments'
    },
    {
      routerLink: "/trainer/showClients",
      icon: 'fas fa-users',
      label: 'Clients'
   },
   {
    routerLink:"/trainer/showDailyWorkouts",
    icon:'fas fa-dumbbell',
    label: 'Workout Patterns'
   }
  ];
}
