import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PlanService } from '../../../services/plan.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../model/user.model';
import { Trainer } from '../../../model/trainer.model';
import { TrainerService } from '../../../services/trainer.service';

@Component({
  selector: 'app-trainer-workoutplan',
  templateUrl: './trainer-workoutplan.component.html',
  styleUrl: './trainer-workoutplan.component.scss'
})
export class TrainerWorkoutplanComponent implements OnInit{
  date: Date; 
  user:User|null;
  userId:string|null;
  trainer:Trainer|null;
  trainerId:string|null;
  
  constructor(
  
    private userService:UserService,
    private planService:PlanService,
    private trainerService:TrainerService,
    private toaster:ToastrService) {
    this.date = new Date(); 
  }
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.userId = this.user.id;
    
  }
  getTrainerDetails(){
    this.userService.getTrainerByUserId(this.userId)
  }
  
  
  onDateChange() {
    console.log('Selected Date:', this.date); 
    
  }

}
