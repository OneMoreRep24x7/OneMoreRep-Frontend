import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';
import { TrackingRequest } from '../../../model/plan.model';
import { PlanService } from '../../../services/plan.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tracking-details',
  templateUrl: './tracking-details.component.html',
  styleUrls: ['./tracking-details.component.scss']
})
export class TrackingDetailsComponent implements OnInit {
  user: User | null;
  userId: string | null;
  startRange: number;
  endRange: number;
  weights: number[] = [];
  showMessage: boolean = false;
  warningMessage: string = '';
  selectedWeight: number;
  warningColor:string = 'red'
  userBMI:number|null;
  selectedGoal: string; 
  currentWeight:number;
 

  constructor(
    private userService: UserService,
    private planService:PlanService,
    private router :Router,
    private toaster:ToastrService
    ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.userId = this.user.id;
    this.getUserBMI();
    this.getUserDetails()
   
    
  }
  getUserDetails(){
    this.userService.getUserDetails(this.userId).subscribe(
      (response)=>{
        this.userBMI = response.bmi;
       this.currentWeight = response.weight;
       
      }
    )
  }

  getUserBMI() {
    this.userService.findUserBMI(this.userId).subscribe(
      (response) => {
        console.log(response.message, ">>>>>>>>>>>>>");
        this.getUserTargetWeight();
      }
    );
  }

  getUserTargetWeight() {
    this.userService.findUserTargetWeight(this.userId).subscribe(
      (response) => {
        this.startRange = response.startRange;
        this.endRange = response.endRange;
        this.generateWeightOptions();
      }
    );
  }

  generateWeightOptions() {
    this.weights = [];
    const range = this.endRange - this.startRange;


    // Generate weights within the range
    for (let i = this.startRange; i <= this.endRange; i++) {
        this.weights.push(i);
    }

    // Generate weights above endRange
    for (let i = this.endRange + 1; i <= this.endRange + 10; i++) { 
        const randomDecimal = (Math.random() * 10) + this.endRange;
        const randomWeight = parseFloat(randomDecimal.toFixed(1)); // Limit to 1 decimal place
        this.weights.push(randomWeight);
    }
    for (let i = 0; i < 10; i++) { 
      const randomDecimal = (Math.random() * this.startRange);
      const randomWeight = parseFloat(randomDecimal.toFixed(1)); 
      if (randomWeight > 10) {
          this.weights.push(randomWeight);
      }
  }
    this.weights.sort((a, b) => a - b);
}




  

  validateWeight(weight:string) {
    this.selectedWeight = parseFloat(weight)
    if (this.selectedWeight >= this.startRange && this.selectedWeight <= this.endRange) {
      this.showMessage = true;
      this.warningMessage = `Your target weight is perfectly aligned with your ideal weight range of ${this.startRange} kg to ${this.endRange} kg.`;
    } else {
      this.showMessage = true;
      this.warningMessage = `Your target weight should be between ${this.startRange} kg and ${this.endRange} kg for a healthy BMI.`;
    }
      
    
  }
  isWithinRange(): boolean {
    return this.selectedWeight >= this.startRange && this.selectedWeight <= this.endRange;
  }
  
  
   track(){
    const data:TrackingRequest={
      userId:this.userId,
      targetWeight:this.selectedWeight,
      primaryGoal:this.selectedGoal
    }
    this.planService.setPrimaryGoal(data).subscribe(
      (response)=>{
        if(response.statusCode === 200){
          this.router.navigateByUrl("/user/tracking")
        }
        
      },(error)=>{
        this.toaster.error(error)
      }
    )

    
   }
}
