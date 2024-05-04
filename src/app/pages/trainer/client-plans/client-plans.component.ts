import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../model/User.model';
import { UserService } from '../../../services/user.service';
function getWeekday(dateString: string): string {
  const date = new Date(dateString); // Create a Date object from the string
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return weekdays[date.getDay()]; // Get the weekday name from the Date object
}


@Component({
  selector: 'app-client-plans',
  templateUrl: './client-plans.component.html',
  styleUrls: ['./client-plans.component.scss']
})
export class ClientPlansComponent implements OnInit {
  clientId: string | null = null;
  user: User | null = null;
  userId: string | null = null;
  caloriesEaten: number[] = new Array(7).fill(0);
  caloriesBurned: number[] = new Array(7).fill(0);

  data: any;
  options: any = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true, // Y-axis starts at zero
        },
      }],
    },
    responsive: true, // Ensure chart is responsive
    maintainAspectRatio: false, // Allow chart to adjust its aspect ratio
  };

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0); 
    this.route.queryParams.subscribe((params) => {
      this.clientId = params['id'];
    });

    this.service.getUserDetails(this.clientId).subscribe((response) => {
      this.user = response;
      this.userId = this.user.id;
      this.getCalories(); // Fetch calories data
    });
  }

  getCalories() {
    this.service.getCalories(this.userId).subscribe((response) => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

      this.caloriesEaten.fill(0);
      this.caloriesBurned.fill(0);

      // Fill caloriesEaten based on response
      for (const [dateString, calories] of Object.entries(response.caloriesEaten)) {
        const day = getWeekday(dateString); // Get the weekday
        const index = days.indexOf(day);

        const caloriesValue = typeof calories === 'number' ? calories : 0;

// Add calories for that day
if (index !== -1) {
  this.caloriesEaten[index] += caloriesValue;
}
      }

      // Fill caloriesBurned based on response
      for (const [dateString, calories] of Object.entries(response.caloriesBurned)) {
        const day = getWeekday(dateString);
        const index = days.indexOf(day);

        const caloriesValue = typeof calories === 'number' ? calories : 0;

        if (index !== -1) {
          this.caloriesBurned[index] += caloriesValue;
        }
      }

      this.data = {
        labels: days,
        datasets: [
          {
            label: 'Calories Eaten',
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light orange
            borderColor: 'rgba(255, 99, 132, 1)', // Orange
            borderWidth: 1,
            data: this.caloriesEaten,
          },
          {
            label: 'Calories Burned',
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue
            borderColor: 'rgba(54, 162, 235, 1)',
            data: this.caloriesBurned,
          },
        ],
      };
    });
  }

  addWorkout() {
    this.router.navigate(['/trainer/clientWorkout'], { queryParams: { id: this.clientId } });
  }

  addDiet() {
    this.router.navigate(['/trainer/clientDiet'], { queryParams: { id: this.clientId } });
  }
}
