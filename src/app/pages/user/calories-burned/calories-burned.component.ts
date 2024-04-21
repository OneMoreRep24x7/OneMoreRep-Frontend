import { Component, OnInit } from '@angular/core';
import { TrackingDetails, User } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';
import { PlanService } from '../../../services/plan.service';
import { Workout } from '../../../model/plan.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calories-burned',
  templateUrl: './calories-burned.component.html',
  styleUrl: './calories-burned.component.scss'
})
export class CaloriesBurnedComponent implements OnInit{
  user:User|null;
  userId:string|null;
  trackingDetails:TrackingDetails|null;
  totalCaloriesToBurn:number|null;
  caloriesBurned:number|null;
  workouts:Workout[]|null;
  searchResults: Workout[] = []; 
  selectedWorkouts: Workout[] = []; 
  visible: boolean = false;
  searchQuery: string = '';
  maxSelectableWorkouts: number = 7; 
  workoutForm: FormGroup;
  trackedWorkouts:Workout[] =[]
  


  constructor(
    private userService:UserService,
    private planService:PlanService,
    private formBuilder:FormBuilder,
    private toaster:ToastrService){}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.userId = this.user.id;
    this.getTrackingDetails();
    this.getWorkouts();
    this.getTrackedWorkoutsandRecipe();
    this.workoutForm = this.formBuilder.group({
    
      searchQuery:['']
    });
   
    
  }

  getWorkouts(){
    this.planService.getWorkouts().subscribe(
      (response) => {
        this.workouts = response;
      }
    );
  }

  getTrackingDetails() {
    this.userService.getTrackingDetails(this.userId).subscribe(
      (response)=>{
        this.trackingDetails = response.details;
        this.totalCaloriesToBurn = this.trackingDetails.workoutBurn;
        this.caloriesBurned = this.trackingDetails.caloriesBurned;

      }
    )
    
  }
  getTrackedWorkoutsandRecipe(){
    this.planService.getTrackingDeatils(this.userId).subscribe(
      (response)=>{
        if(response.statusCode === 200){
          this.trackedWorkouts = response.details.workouts;
          console.log(this.trackedWorkouts,">>>>>>>>>>>>>>");
          
        }
      }
    )

  }
  // Method to calculate progress percentage, outer stroke width, and inner stroke width
  calculateProgressPercentage(caloriesBurned: number | null, totalCaloriesToBurn: number | null): number {
    if (caloriesBurned === null || totalCaloriesToBurn === null || totalCaloriesToBurn === 0) {
      return 0;
    }
    return (caloriesBurned / totalCaloriesToBurn) * 100;
  }

  calculateOuterStrokeWidth(caloriesBurned: number | null, totalCaloriesToBurn: number | null): number {
    const radius = 100; // Adjust as needed
    return radius / 10; // Adjust as needed
  }

  calculateInnerStrokeWidth(caloriesBurned: number | null, totalCaloriesToBurn: number | null): number {
    const radius = 100; // Adjust as needed
    return radius / 12; // Adjust as needed
  }

  showDialog(): void {
    this.visible = true;
    this.searchQuery = ''; // Clear search query on opening modal
    this.searchResults = []; // Clear search results
  }

  closeModal(): void {
    this.visible = false;
  }

  canAddWorkout(workout: any): boolean {
    // Check if the maximum number of workouts is reached
    if (this.selectedWorkouts.length >= this.maxSelectableWorkouts) {
      return false; // Maximum workouts reached, cannot add more
    }
  
    // Check if the workout is already added
    const isWorkoutAdded = this.selectedWorkouts.some(selectedWorkout => selectedWorkout.id === workout.id);
    if (isWorkoutAdded) {
      return false; // Workout already added, cannot add again
    }
  
    return true; // Can add the workout
  }
  
  addWorkoutToTracking(workout: any): void {
    if (this.canAddWorkout(workout)) {
      this.selectedWorkouts.push(workout);
      const calories = workout.caloriesBurned;
      console.log(calories,">>>>>>>>>")
      const data ={
        userId:this.userId,
        workout:workout
      }
      const caloriesData ={
        userId:this.userId,
        caloriesBurned:calories
      }
      
      this.planService.updateWorkoutTracking(data).subscribe(
        (response)=>{
          this.trackedWorkouts = response.details.workouts;
          console.log(this.trackedWorkouts,"trackedWorkouts>>>>>>>>>>>>>>");
          
        }
      )
      this.userService.updateWorkoutTracking(caloriesData).subscribe(
        (response)=>{
          if(response.statusCode === 200){
            this.caloriesBurned = response.details.caloriesBurned;
            this.selectedWorkouts = []
            this.closeModal()
            this.toaster.success(response.message);
          }
          
        },(error)=>{
          this.toaster.error(error);
        }
      )
    
    }
  }
  removeWorkoutFromTracking(workout:any){
    console.log("Remove button pressed >>>>>>>>>>>");
    const calories = -Math.abs(workout.caloriesBurned);
    
    const data = {
      userId:this.userId,
      workout:workout

    }
    const caloriesData ={
      userId:this.userId,
      caloriesBurned:calories
    }
    console.log(data,">>>>>>>>>>>",caloriesData);
    
    this.planService.removeWorkoutFromTracking(data).subscribe(
      (response)=>{
        if(response.statusCode === 200){
         this.getTrackedWorkoutsandRecipe()
        }
      }
    )
    this.userService.updateWorkoutTracking(caloriesData).subscribe(
      (response)=>{
        if(response.statusCode === 200){
          this.caloriesBurned = response.details.caloriesBurned;
          this.toaster.success(response.message);
        }
        
      },(error)=>{
        this.toaster.error(error);
      }
    )
    
  }
  

 
  searchWorkouts(keyword: string): void {
    if (keyword.trim() !== '') {
   
      this.searchResults = this.workouts.filter((workout) =>
        workout.workoutCategory.toLowerCase().includes(keyword.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }
}
