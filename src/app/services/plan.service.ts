import { Injectable } from '@angular/core';
import { Food, FoodModel, FoodRes, RecipeVariant, VariantModel, VariantRes, WorkoutRes } from '../model/plan.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { WorkoutModel } from '../model/profile.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(
    private http:HttpClient
  ) { }

  addFood(data: FoodModel, foodImage: File): Observable<FoodRes> {
    const formData: FormData = new FormData();
    formData.append('file', foodImage);
    formData.append('recipeRequest', JSON.stringify(data)); // No need to stringify
  
    return this.http.post<FoodRes>("api/v1/plans/addRecipe", formData);
  }
  getFoods() :Observable<any[]> {
    return this.http.get<any[]>("api/v1/plans/getRecipes")
  }
  addVariant(data: VariantModel,recipeId:number) :Observable<VariantRes> {
    const url = `api/v1/plans/addRecipeVariant?recipeId=${recipeId}`;
    console.log(data,'>>>>>>>')
    return this.http.post<VariantRes>(url,data)
  }

  getAllVariant(): Observable<any> {
    return this.http.get("api/v1/plans/getRecipeVariant").pipe(
      tap(response => {
        console.log("Response from getAllVariant():", response);
      })
    );
  }
  

  addWorkout(data: WorkoutModel, video: File):Observable<WorkoutRes> {
    const formData:FormData = new FormData();
    formData.append('file',video);
    formData.append('workoutRequest',JSON.stringify(data))
   return this.http.post<WorkoutRes>("api/v1/plan/addWorkout",formData)
  }

  getFoodById(foodId: number) :Observable<Food>{
    const url = `api/v1/plans/getRecipeById?foodId=${foodId}`;
   return this.http.get<Food>(url);
  }
  

  
}
