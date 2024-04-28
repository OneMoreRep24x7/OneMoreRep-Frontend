import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanService } from '../../../services/plan.service';
import { ToastrService } from 'ngx-toastr';
import { Trainer } from '../../../model/trainer.model';
import { ActivatedRoute } from '@angular/router';
import { WorkoutPlanParams } from '../../../model/plan.model';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.scss']
})
export class AddPlansComponent implements OnInit {
  planForm: FormGroup;
  visible: boolean = false;
  trainer:Trainer|null;
  trainerId: string|null;
  userId:string|null;
  dailyWorkouts: any[] = []; // Initialize as empty array
  searchResults: any[] = [];
  selectedWorkouts: any[] = [];
  maxSelectableWorkouts: number = 6;

  constructor(
    private formBuilder: FormBuilder,
    private planService: PlanService,
    private toaster: ToastrService,
    private route :ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.trainer = JSON.parse(sessionStorage.getItem('user'));
    this.trainerId = this.trainer.id;
    this.route.queryParams.subscribe(params => {
      this.userId= params['id'];
     
     });
    this.planForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      planName: ['', Validators.required],
      repeat: ['', Validators.required],
      searchQuery: ['']
    });

   
    this.getDailyWorkouts();
  }

  getDailyWorkouts(): void {
    
    this.planService.getDailyWorkouts(this.trainerId).subscribe(
      (response) => {
        this.dailyWorkouts = response;
        console.log(response);
        
       
      },
      (error) => {
        console.error('Error fetching daily workouts:', error);
      }
    );
  }

  searchDailyWorkouts(): void {
    const keyword = this.planForm.get('searchQuery')?.value.trim().toLowerCase();
    if (keyword.trim() !== '') {
    this.searchResults = this.dailyWorkouts.filter(dailyWorkout => dailyWorkout.workoutType.toLowerCase().includes(keyword));
    }else{
      this.searchResults = []
    }
 
  }
 
 

  showDialog(): void {
    this.visible = true;
 
  }

  closeModal(): void {
    this.visible = false;
    this.searchResults =[]
   
  }

  savePlan(): void {
    if (this.planForm.invalid) {
      this.toaster.error('Please fill out all the form fields.');
      return;
    }

    if (this.selectedWorkouts.length === 0) {
      this.toaster.error('Please add at least one workout.');
      return;
  }
     if (this.planForm.valid) {
      const data: WorkoutPlanParams = {
        userId: this.userId,
        trainerId: this.trainerId,
        startDate: this.planForm.get('startDate').value,
        planName: this.planForm.get('planName').value,
        repeat: this.planForm.get('repeat').value,
        dailyWorkouts: this.selectedWorkouts
      };

      console.log(data,">>>>>>>>>>>>>>>>>>>>>>");
      this.planService.addWorkoutPlans(data).subscribe(
        (response)=>{
          if(response.statusCode === 200){
            this.toaster.success(response.message)
          }else{
            this.toaster.error(response.message)
          }
        }
      )
      
    }
    
    this.closeModal();
  }

  isDailyWorkoutSelected(dailyWorkout: any): boolean {
    return this.selectedWorkouts.some(selectedWorkout => selectedWorkout.id === dailyWorkout.id);
  }

  addDailyWorkout(dailyWorkout: any): void {
    if (this.selectedWorkouts.length < this.maxSelectableWorkouts && !this.isDailyWorkoutSelected(dailyWorkout)) {
      this.selectedWorkouts.push(dailyWorkout);
    }
  }

  removeDailyWorkout(index: number): void {
    this.selectedWorkouts.splice(index, 1);
  }
}
