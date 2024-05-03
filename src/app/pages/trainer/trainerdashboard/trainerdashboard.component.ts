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
   },
   {
    routerLink:"/trainer/connectClients",
    icon:'fas fa-comments',
    label:'Chats'
   },
   {
    routerLink:"/trainer/showDailyDiet",
    icon: 'fas fa-utensils',
    label: 'Daily Diet'
   }

  ];
  chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Clients per Month',
        data: [5, 10,8,2,9], // Example client data
        borderColor: '#FF5733', // Optional: Border color
        backgroundColor: 'rgba(255, 87, 51, 0.5)', // Optional: Transparent background color
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
          text: 'Client Count',
        },
        beginAtZero: true,
        min: 0,
        max: 10, // Set a max value to ensure consistent scaling
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
