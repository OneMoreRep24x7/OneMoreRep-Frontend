import { Component } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss'
})
export class AdmindashboardComponent {
  logoText:String = "Admin"
  logoIcon:String = "A"
  navbarData = [
    {
      routerLink:"/admin/recipe",
      icon:'fas fa-utensils',
      label: 'Foods'

    },
  
    {
      routerLink:"/admin/recipeVariant",
      icon:'fas fa-seedling',
      label: 'Food Variants'
    },
    {
      routerLink: "/admin/users",
      icon: 'fas fa-users',
      label: 'Users'
   },
   {
    routerLink:"/admin/workout",
    icon:'fas fa-dumbbell',
    label: 'Workouts'
   },
   {
    routerLink:"/admin/trainers",
    icon:'fas fa-running',
    label: 'Trainers'
   },
   {
    routerLink:"/admin/payments",
    icon:'fas fa-wallet',
    label: 'Payments'
   }
  ];
 

}
