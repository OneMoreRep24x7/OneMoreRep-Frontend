import { Component, OnInit } from '@angular/core';
import { Trainer } from '../../../model/trainer.model';
import { PlanService } from '../../../services/plan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-workouts',
  templateUrl: './show-workouts.component.html',
  styleUrl: './show-workouts.component.scss'
})
export class ShowWorkoutsComponent implements OnInit{
  itemsPerPage = 2;
  currentPage = 1;
  trainer:Trainer | null;
  trainerId:string|null;
  dailyWorkouts:any[]|null;
  searchText: string = '';

  constructor(
    private planService:PlanService,
    private router:Router
    ){}



  ngOnInit(): void {
    window.scrollTo(0, 0); 
    this.trainer = JSON.parse(sessionStorage.getItem('user'));
    this.trainerId= this.trainer.id;
    this.getAllWorkouts();
   }

   getAllWorkouts(){
    this.planService.getDailyWorkouts(this.trainerId).subscribe(
      (response)=>{
        this.dailyWorkouts = response
        console.log(response,">>>>>");
        
      }
     )
   }

   get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.dailyWorkouts.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
  search(): void {
    if (this.searchText.trim() === '') {
      this.getAllWorkouts();
    } else {
    
      this.dailyWorkouts = this.dailyWorkouts.filter(workout =>
        workout.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  addWorkout(){
    this.router.navigateByUrl('/trainer/addDailyWorkout');
    
  }

}
