import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlanService } from '../../../services/plan.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.scss'
})
export class WorkoutComponent {
  itemsPerPage = 5;
  currentPage = 1;
  workouts: any[] = [];
  searchText: string = '';

  constructor(
    private router: Router,
    private service: PlanService
  ) {}

  ngOnInit(): void {
    this.getAllWorkouts();
  }

  addFood() {
    this.router.navigateByUrl("/admin/addRecipe");
  }

  getAllWorkouts() {
    this.service.getWorkouts().subscribe(
      (response: any[]) => {
        console.log(response);
        this.workouts = response;
      }
    );
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.workouts.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
  search(): void {
    if (this.searchText.trim() === '') {
      this.getAllWorkouts();
    } else {
    
      this.workouts = this.workouts.filter(workout =>
        workout.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  addWorkout(){
    this.router.navigateByUrl("admin/addWorkout")
  }
  playVideo(video: HTMLVideoElement) {
    video.play();
}
}
