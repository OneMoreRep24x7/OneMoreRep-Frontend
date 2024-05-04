import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PlanService } from '../../../services/plan.service';
import { ToastrService } from 'ngx-toastr';

import { Trainer } from '../../../model/trainer.model';
import { TrainerService } from '../../../services/trainer.service';
import { DailyWorkout, Workout, WorkoutPlan, WorkoutPlanRequest } from '../../../model/plan.model';
import { User } from '../../../model/User.model';

@Component({
  selector: 'app-trainer-workoutplan',
  templateUrl: './trainer-workoutplan.component.html',
  styleUrls: ['./trainer-workoutplan.component.scss']
})
export class TrainerWorkoutplanComponent implements OnInit {
  date: Date; 
  user: User | null = null;
  userId: string | null = null;
  trainer: Trainer | null = null;
  trainerId: string | null = null;
  dailyWorkout: DailyWorkout | null = null;
  workoutPlan:WorkoutPlan|null;
  selectedVideoUrl: string | null = null; 
  
  constructor(
    private userService: UserService,
    private planService: PlanService,
    private trainerService: TrainerService,
    private toastr: ToastrService
  ) {
   
  }
  
  ngOnInit(): void {
    window.scrollTo(0,0)
    
    const userFromSession = sessionStorage.getItem('user');
    if (userFromSession) {
      this.user = JSON.parse(userFromSession);
      this.userId = this.user?.id;
    }
    this.getTrainerDetails();
    this.userService.getUserDetails(this.userId).subscribe(
      (response)=>{
        this.user = response
      }
    )
  }
  isTrainerValid(): boolean {
    if (this.user?.trainerValid) {
      const currentDate = new Date();
      const trainerValidityDate = new Date(this.user.trainerValid);
      return trainerValidityDate > currentDate;
    }
    return false;
  }
  
  getTrainerDetails(): void {
    if (this.userId) {
      this.userService.getTrainerByUserId(this.userId).subscribe(
        (response) => {
          if (response.statusCode === 200) {
            this.trainer = response.trainer;
            this.trainerId = this.trainer?.id;
            console.log(this.trainer, "Trainer....");
          }
        }
      );
    }
  }
  
  getDailyWorkout(): void {
    const formattedDate = this.date.toLocaleDateString('en-CA'); 
    const data: WorkoutPlanRequest = {
      date: formattedDate, // Send date in ISO format
      userId: this.userId,
      trainerId: this.trainerId
    };
    
    
    this.planService.getDailyWorkoutByDate(data).subscribe(
      (response) => {
        this.dailyWorkout = response.todayWorkout;
        this.workoutPlan = response.workoutPlan;
        console.log(this.dailyWorkout,">>>>>>>");
        console.log(this.workoutPlan,">>>>>>>>>>>");
        if(response.statusCode === 404){
         this.toastr.warning(response.message)
        }
        
        
      }
    );
  }
  onDateSelect(event: any) {
    console.log(event,"Event");
    
    this.date = event; // Extract the selected date from the event object
    console.log('Selected Date:', this.date); // Log the selected date for verification
   this.getDailyWorkout();
    
  }
  isRestDay(): boolean {
    // Guard against undefined 'date'
    if (!this.date) {
      return false; // Return false or handle the undefined case
    }

    // Check if the selected day is Sunday
    const dayOfWeek = this.date.getDay();
    return dayOfWeek === 0; // Sunday
  }
  playWorkoutVideo(videoUrl: string) {
    this.selectedVideoUrl = videoUrl; // Set the video URL when a workout is clicked
  }

}
