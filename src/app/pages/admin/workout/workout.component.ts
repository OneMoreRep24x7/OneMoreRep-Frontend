import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.scss'
})
export class WorkoutComponent {
  constructor(private router:Router){}

  addWorkout(){
    this.router.navigateByUrl("admin/addWorkout")
  }
}
