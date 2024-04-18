import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from '../../../services/plan.service';
import { Trainer } from '../../../model/trainer.model';

@Component({
  selector: 'app-client-workout',
  templateUrl: './client-workout.component.html',
  styleUrls: ['./client-workout.component.scss'] // corrected property name

})
export class ClientWorkoutComponent implements OnInit {
  date: Date = new Date(); 
  userId:string | null;
  dailWorkouts:any[]|null;
  trainer:Trainer|null;
  trainerId:string|null;

  constructor(
   private router:Router,
   private route:ActivatedRoute,
   private planService:PlanService){}

  ngOnInit(): void {
    window.scrollTo(0, 0); 
    this.trainer = JSON.parse(sessionStorage.getItem('user'));
    this.trainerId= this.trainer.id;
    console.log(this.date, ">>>>>>>>>>");
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
  });
   this.planService.getDailyWorkouts(this.trainerId).subscribe(
    (response)=>{
      this.dailWorkouts = response
      console.log(response,">>>>>");
      
    }
   )
  }
 

 

  handleDateSelect(event: any) {
    this.date = event.value; // Access the selected date from the event object
    console.log("Selected date:", this.date); // Example usage
  }
  dailyWorkout(){
    
  }
  workoutPlan(){

  }
  
}
