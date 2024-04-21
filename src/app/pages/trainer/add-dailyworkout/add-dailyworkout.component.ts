import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { PlanService } from '../../../services/plan.service';
import { ToastrService } from 'ngx-toastr';
import { DailyWorkout, Workout } from '../../../model/plan.model';
import { Trainer } from '../../../model/trainer.model';

@Component({
  selector: 'app-add-dailyworkout',
  templateUrl: './add-dailyworkout.component.html',
  styleUrls: ['./add-dailyworkout.component.scss']
})
export class AddDailyworkoutComponent implements OnInit {
  workoutForm: FormGroup;
  trainer:Trainer|null;
  trainerId:string|null;
  workouts: Workout[] = []; 
  searchResults: Workout[] = []; 
  selectedWorkouts: Workout[] = []; 
  visible: boolean = false;
  searchQuery: string = '';
  maxSelectableWorkouts: number = 7; 
  days: string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

  constructor(
    private formBuilder: FormBuilder,
    private planService: PlanService,
    private toaster:ToastrService
  ) {}

  ngOnInit(): void {
    this.trainer = JSON.parse(sessionStorage.getItem('user'));
    this.trainerId = this.trainer.id;
    this.workoutForm = this.formBuilder.group({
      day: ['', Validators.required], // Add validators as needed
      workoutType: ['', Validators.required], // Add validators as needed
      searchQuery:['']
    });

    this.planService.getWorkouts().subscribe(
      (response) => {
        this.workouts = response;
      }
    );

  
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
  
  addWorkoutToPlan(workout: any): void {
    if (this.canAddWorkout(workout)) {
      this.selectedWorkouts.push(workout);
      // Update workouts form array (optional, depending on usage)
      (this.workoutForm.get('workouts') as FormArray).push(new FormGroup({ workoutId: new FormControl(workout.id) }));
    }
  }
  

  removeWorkoutFromPlan(index: number): void {
    this.selectedWorkouts.splice(index, 1);
    // Remove workout from form array (optional, depending on usage)
    (this.workoutForm.get('workouts') as FormArray).removeAt(index);
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
  

  addWorkout(): void {
    if (this.workoutForm.invalid) {
        this.toaster.error('Please fill out all the form fields.');
        return;
    }

    if (this.selectedWorkouts.length === 0) {
        this.toaster.error('Please add at least one workout.');
        return;
    }
       if (this.workoutForm.valid) {
        const data :DailyWorkout = {
          ownerId:this.trainerId,
          day: this.workoutForm.get('day')?.value,
          workoutType: this.workoutForm.get('workoutType')?.value,
          workouts: this.selectedWorkouts
        };
       
        
        this.planService.addDailyWorkout(data).subscribe(
          (response)=>{
            console.log(response,">>>>>>");
            
            if(response.statusCode === 200){
              this.toaster.success(response.message);
              this.workoutForm.reset();

            }else{
              this.toaster.error(response.message)
              this.workoutForm.reset()
            }
          },(error)=>{
            this.toaster.error(error);
          }
        )
      }


    
  
    this.closeModal();
   
}

}
