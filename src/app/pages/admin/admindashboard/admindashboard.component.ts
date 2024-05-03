import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../../services/plan.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss'
})
export class AdmindashboardComponent implements OnInit {
  
  logoText:String = "Admin"
  logoIcon:String = "A"
  toatalPayment: any[] =[800,170,2000];

 
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
  constructor(private planService:PlanService){}
  ngOnInit(): void {
    this.getTotalPaymentPerMonth();
  }
  getTotalPaymentPerMonth(){
    this.planService.getTotalPayment().subscribe(
      (response )=>{
        console.log(response,"Total Payment");
        
      })
  }

  chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Payments per Month',
        data: this.toatalPayment, // Example client data
        borderColor: '#FF5739', // Optional: Border color
        backgroundColor: 'rgba(255, 87, 51)', // Optional: Transparent background color
      },
    ],
  };

  // Options for the chart
  chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
        beginAtZero: true,
        min: 150,
        max: 2500, // Set a max value to ensure consistent scaling
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  };
 

}
