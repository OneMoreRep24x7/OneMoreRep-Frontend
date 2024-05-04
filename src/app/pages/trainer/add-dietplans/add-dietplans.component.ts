import { Component, OnInit } from '@angular/core';
import { Trainer } from '../../../model/trainer.model';
import { ActivatedRoute } from '@angular/router';
import { PlanService } from '../../../services/plan.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { TrainerService } from '../../../services/trainer.service';
import { User } from '../../../model/User.model';

@Component({
  selector: 'app-add-dietplans',
  templateUrl: './add-dietplans.component.html',
  styleUrl: './add-dietplans.component.scss'
})
export class AddDietplansComponent implements OnInit{
  trainer:Trainer|null;
  trainerId:string|null;
  user:User|null;
  userId:string|null;
  visible:boolean = false;
  dailyDiets: any[] = [];
  dietForm:FormGroup
  searchResults: any[] = [];
  selectedDiets: any[] = [];
  maxSelectableDiets: number = 7;


  constructor(
    private route:ActivatedRoute,
    private planService:PlanService,
    private toster:ToastrService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private trainerService:TrainerService
  ){

  }


  ngOnInit(): void {
   window.scrollTo(0,0);
   this.trainer = JSON.parse(sessionStorage.getItem('user'));
   this.trainerId = this.trainer.id;
   this.route.queryParams.subscribe(params => {
    this.userId= params['id'];
   });
   this.dietForm = this.formBuilder.group({
    startDate: ['', Validators.required],
    planName: ['', Validators.required],
    repeat: ['', Validators.required],
    searchQuery: ['']
  });
   this.getAllDailyDiets();
   this.getUserDetails();
   this.getTrainerDetails();
  }
  getAllDailyDiets(){
    this.planService.getAllDailyDiets().subscribe(
      (response)=>{
        this.dailyDiets = response;
        console.log(this.dailyDiets,"DailyDiets>>>>>>");
        
      }
    )
  }
  getUserDetails(){
    this.userService.getUserDetails(this.userId).subscribe(
      (response)=>{
        this.user = response;
      }
    )
  }

  getTrainerDetails(){
    this.trainerService.getTrainerById(this.trainerId).subscribe(
      (response)=>{
        this.trainer = response.trainer;
      }
    )
  }

  searchDailydiets(): void {
    const keyword = this.dietForm.get('searchQuery')?.value.trim().toLowerCase();
    if (keyword.trim() !== '') {
    this.searchResults = this.dailyDiets.filter(dailyDiet => dailyDiet.day.toLowerCase().includes(keyword));
    }else{
      this.searchResults = []
    }
 
  }

  showDialog(){
    this.visible = true;
  }
  closeModal(){
    this.visible = false;
    this.dietForm.reset()
  }
  savePlan(){
    if (this.dietForm.invalid) {
      this.toster.error('Please fill out all the form fields.');
      return;
    }

    if (this.selectedDiets.length === 0) {
      this.toster.error('Please add at least one diet.');
      return;
   }
    if (this.dietForm.valid) {
      const userFullName = `${this.user.firstName} ${this.user.lastName}`;
      const trainerFullName = `${this.trainer.firstName} ${this.trainer.lastName}`;
      const userEmail = this.user.email;
      const userPhoneNumber = this.user.phone;
      const data = {
        userId: this.userId,
        trainerId: this.trainerId,
        startDate: this.dietForm.get('startDate').value,
        planName: this.dietForm.get('planName').value,
        repeat: this.dietForm.get('repeat').value,
        dailyDiets: this.selectedDiets,
        userFullName:userFullName,
        trainerFullName:trainerFullName,
        userEmail:userEmail,
        userPhoneNumber:userPhoneNumber
      };

      console.log(data,">>>>>>>>>>>>>>>>>>>>>>");
     
      this.planService.addDietPlans(data).subscribe(
        (response)=>{
          if(response.statusCode === 200){
            this.toster.success(response.message);
          }else{
            this.toster.error(response.message);
          }

        }
      )
    }
    this.closeModal();

  }
  isDailyDietSelected(dailyDiet: any): boolean {
    return this.selectedDiets.some(selectedDiet => selectedDiet.id === dailyDiet.id);
  }

  addDailyDiet(dailyDiet: any): void {
    if (this.selectedDiets.length < this.maxSelectableDiets && !this.isDailyDietSelected(dailyDiet)) {
      this.selectedDiets.push(dailyDiet);
    }
  }

  removeDailyDiet(index: number): void {
    this.selectedDiets.splice(index, 1);
  }
}
