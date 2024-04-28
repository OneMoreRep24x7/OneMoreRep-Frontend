import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { Trainer } from '../../../model/trainer.model';
import { UserService } from '../../../services/user.service';
import { PlanService } from '../../../services/plan.service';
import { ToastrService } from 'ngx-toastr';
interface Meal {
  id: number;
  recipeName: string;
  calories: number;
  carbs: number;
  fat: number;
  fiber: number;
  protein: number;
  quantity: number;
  unit: string;
}
@Component({
  selector: 'app-trainer-dietplan',
  templateUrl: './trainer-dietplan.component.html',
  styleUrl: './trainer-dietplan.component.scss'
})
export class TrainerDietplanComponent implements OnInit {
  date: Date; 
  user: User | null = null;
  userId: string | null = null;
  trainer: Trainer | null = null;
  trainerId: string | null = null;
  dailyDiet: any | null = null;
  dietPlan:any|null;
  selectedVideoUrl: string | null = null; 
  
  constructor(
    private userService: UserService,
    private planService: PlanService,
    private toastr: ToastrService
  ){

  }


  ngOnInit(): void {
    window.scrollTo(0,0);
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.userId = this.user.id;
    this.getTrainerDetails();
    this.userService.getUserDetails(this.userId).subscribe(
      (response)=>{
        this.user = response
      }
    )
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

  isTrainerValid(): boolean {
    if (this.user?.trainerValid) {
      const currentDate = new Date();
      const trainerValidityDate = new Date(this.user.trainerValid);
      return trainerValidityDate > currentDate;
    }
    return false;
  }

  getDailyDietPlan(){
    const formattedDate = this.date.toLocaleDateString('en-CA'); 
    const data = {
      date: formattedDate, // Send date in ISO format
      userId: this.userId,
      trainerId: this.trainerId
    };
    this.planService.getDailyDietByDate(data).subscribe(
      (response)=>{
        console.log(response);
        
        this.dailyDiet = response.todayDiet;
        this.dietPlan= response.dietPlan;
        console.log(this.dailyDiet,">>>>>>>");
        console.log(this.dietPlan,">>>>>>>>>>>");
        if(response.statusCode === 404){
         this.toastr.warning(response.message)
        }
        
      }
    )
  }
  onDateSelect(event: any) {
    console.log(event,"Event");
    
    this.date = event; // Extract the selected date from the event object
    console.log('Selected Date:', this.date); // Log the selected date for verification
    this.getDailyDietPlan();
    
  }
  groupAndCountMeals(meals: Meal[]) {
    const grouped = new Map<string, { meal: Meal; count: number }>();
    meals.forEach((meal) => {
      const key = `${meal.recipeName}-${meal.quantity}-${meal.unit}`;
      if (grouped.has(key)) {
        grouped.get(key).count++;
      } else {
        grouped.set(key, { meal, count: 1 });
      }
    });
    return Array.from(grouped.values());
  }

}
