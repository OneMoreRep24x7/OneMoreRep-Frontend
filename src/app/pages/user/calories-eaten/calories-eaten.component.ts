import { Component, OnInit } from '@angular/core';
import { TrackingDetails, User } from '../../../model/User.model';
import { Food, FoodTrackingResponse, FoodTrackingResponses } from '../../../model/plan.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { PlanService } from '../../../services/plan.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calories-eaten',
  templateUrl: './calories-eaten.component.html',
  styleUrl: './calories-eaten.component.scss'
})
export class CaloriesEatenComponent implements OnInit{

  user:User|null;
  userId:string|null;
  trackingDetails:TrackingDetails|null;
  totalCaloriesNeeded:number|null;
  caloriesConsumed:number|null;
  foods:Food[] = []
  selectedFoods:any[] = []
  visible:boolean;
  searchQuery:string= ''
  trackedFoods:FoodTrackingResponses[] = []
  foodForm:FormGroup;
  searchResults:Food[] =[]
  groupedFoods: FoodTrackingResponses[] = [];


  constructor(
    private userService:UserService,
    private planService:PlanService,
    private formBuilder:FormBuilder,
    private toaster:ToastrService
  ){}


  ngOnInit(): void {
    window.scrollTo(0,0);
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.userId = this.user.id;
    this.getTrackingDetails();
    this.foodForm = this.formBuilder.group({
      searchQuery:['']
    })
    this.getAllFoods()
    this.getTrackedFood()
    
  
  }
  getAllFoods() {
    this.planService.getFoods().subscribe(
      (response: any[]) => {
        console.log(response);
        this.foods = response;
      }
    );
  }
  getTrackedFood(){
    this.planService.getTrackedFood(this.userId).subscribe(
      (response)=>{
        this.trackedFoods = response;
        console.log(this.trackedFoods,".>>>>>>>Tracked foods ");
        this.groupTrackedFoodsWithCount()
        
      }
    )
  }
  groupTrackedFoodsWithCount() {
    const foodMap = new Map<string, { id: string; count: number }>();

    this.trackedFoods.forEach(food => {
      if (foodMap.has(food.recipeName)) {
        const existing = foodMap.get(food.recipeName);
        existing!.count += 1;
      } else {
        foodMap.set(food.recipeName, { id: food.id, count: 1 });
      }
    });

    this.groupedFoods = Array.from(foodMap.entries()).map(([recipeName, details]) => {
      const original = this.trackedFoods.find(food => food.recipeName === recipeName);
      return {
        ...original,
        count: details.count,
      };
    });
    console.log(this.groupedFoods,"Grouped food");
    
  }


  getTrackingDetails() {
    this.userService.getTrackingDetails(this.userId).subscribe(
      (response)=>{
        this.trackingDetails = response.details;
        this.totalCaloriesNeeded = this.trackingDetails.caloriesNeeded;
        this.caloriesConsumed = this.trackingDetails.caloriesEaten;
      }
    )
  }

  increaseQuanity(){
    console.log("Add quantity pressed...");
    
  }
  removeQuantity(){
    console.log("Remove quantity pressed....");
    
  }

    // Method to calculate progress percentage, outer stroke width, and inner stroke width
    calculateProgressPercentage(caloriesConsumed: number | null, totalCaloriesNeeded: number | null): number {
      if (caloriesConsumed === null || totalCaloriesNeeded === null || totalCaloriesNeeded === 0) {
        return 0;
      }
      return (caloriesConsumed / totalCaloriesNeeded) * 100;
    }

    calculateOuterStrokeWidth(caloriesConsumed: number | null, totalCaloriesNeeded: number | null): number {
      const radius = 100; // Adjust as needed
      return radius / 10; // Adjust as needed
    }
  
    calculateInnerStrokeWidth(caloriesConsumed: number | null, totalCaloriesNeeded: number | null): number {
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
  
    canAddFood(food: any): boolean {
      const isFoodAdded = this.selectedFoods.some(selectedFood => selectedFood.id === food.id);
      if (isFoodAdded) {
        return false; // Workout already added, cannot add again
      }
      return true; // Can add the workout
    }
    addFoodToTracking(varinatId:number){
     console.log(varinatId,".>>>>>>>>>>>>>>");
     const data = {
      userId:this.userId,
      variantId:varinatId
      }

  
    this.planService.updateFoodTracking(data).subscribe(
      (response)=>{
        console.log(response,">>>>Response From Plan Service");
        if(response.statusCode === 200){
          this.getTrackingDetails()
          this.closeModal()
          this.getTrackedFood()
        }
        
      },(error)=>{
        this.toaster.error(error);
      }
    )
   
    
     
    }
    removeFoodFromTracking(varinatId:number){
      const data ={
        userId:this.userId,
        variantId:varinatId,
        
      }
      console.log("removeFromTracking",data);
      this.planService.removeFoodFromTracking(data).subscribe(
        (response)=>{
          console.log(response.message);
          this.getTrackingDetails()
          this.getTrackedFood()
          
        }
      )
      
    }
  
    searchFoods(keyword: string): void {
      if (keyword.trim() !== '') {
     
        this.searchResults = this.foods.filter((food) =>
          food.name.toLowerCase().includes(keyword.toLowerCase())
        );
      } else {
        this.searchResults = [];
      }
    }
  

}
