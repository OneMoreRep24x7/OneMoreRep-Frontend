import { Component, OnInit } from '@angular/core';
import { Trainer } from '../../../model/trainer.model';
import { Router } from '@angular/router';
import { PlanService } from '../../../services/plan.service';

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
  selector: 'app-show-dailydiet',
  templateUrl: './show-dailydiet.component.html',
  styleUrl: './show-dailydiet.component.scss'
})
export class ShowDailydietComponent implements OnInit{
  itemsPerPage = 1;
  currentPage = 1;
  trainer:Trainer | null;
  trainerId:string|null;
  dailyDiets:any[]|null;
  searchText: string = '';
  constructor(
    private router:Router,
    private planService:PlanService){

  }

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.trainer = JSON.parse(sessionStorage.getItem('user'))
    this.trainerId = this.trainer.id;
   this.getAllDailyDiets()
  }
 

  getAllDailyDiets(){
   this.planService.getDailyDiet(this.trainerId).subscribe(
    (response)=>{
      console.log(response,"DailyDiet")
      this.dailyDiets = response;
    }
   )
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

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.dailyDiets.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
  search(): void {
    if (this.searchText.trim() === '') {
      this.getAllDailyDiets();
    } else {
    
      this.dailyDiets = this.dailyDiets.filter(workout =>
        workout.day.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  addDiet(){
   this.router.navigateByUrl("/trainer/addDailyDiet");
  }
}
