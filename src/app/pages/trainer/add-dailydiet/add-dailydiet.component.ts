import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanService } from '../../../services/plan.service';
import { Food } from '../../../model/plan.model';
import { Trainer } from '../../../model/trainer.model';
import { ToastrService } from 'ngx-toastr';
interface MealEntry {
  foodName: string;  // Name of the food item
  variant: any;  // Specific variant of the food
}

@Component({
  selector: 'app-add-dailydiet',
  templateUrl: './add-dailydiet.component.html',
  styleUrl: './add-dailydiet.component.scss'
})
export class AddDailydietComponent implements OnInit {
  trainer:Trainer;
  trianerId:string;
  dietForm:FormGroup
  visible:boolean = false;
  foods:Food[];
  searchResults:Food[];
  Breakfast:MealEntry[] =[];
  Lunch:MealEntry[] =[];
  Dinner:MealEntry[] =[];
  searchResultsBreakfast :any[];
  searchResultsLunch: any[];
  searchResultsDinner: any[];


  constructor(
    private formBuilder:FormBuilder,
    private planService:PlanService,
    private toaster:ToastrService
    ){}

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.trainer = JSON.parse(sessionStorage.getItem('user'));
    this.trianerId = this.trainer.id;
    this.dietForm = this.formBuilder.group({
      day: ['', Validators.required], // Add validators as needed
      searchQueryBreakfast: [''],  // Control for breakfast search
      searchQueryLunch: [''],  // Control for lunch search
      searchQueryDinner: [''], 
    });
    this.getAllFoods();
    
  }
  getAllFoods(){
    this.planService.getFoods().subscribe(
      (response: any[]) => {
        console.log(response);
        this.foods = response;
      }
    );
  }
  
  showDialog(){
    this.visible = true;
  }
  closeModal(){
    this.visible = false
    this.Breakfast = [];
    this.Lunch =[];
    this.Dinner = [];
  }
 
  
  addDailyDiet() {

  const extractVariants = (mealEntries: MealEntry[]): any[] => {
  
    return mealEntries.map((entry) => entry.variant);
  };
    // Validate the form
    if (this.dietForm.invalid) {
      this.toaster.error('Please fill out all the form fields.');
      return;
    }
  
    // Ensure each category has at least one food item
    if (this.Breakfast.length === 0) {
      this.toaster.error('Please add at least one food to the Breakfast category.');
      return;
    }
  
    if (this.Lunch.length === 0) {
      this.toaster.error('Please add at least one food to the Lunch category.');
      return;
    }
  
    if (this.Dinner.length === 0) {
      this.toaster.error('Please add at least one food to the Dinner category.');
      return;
    }
  
    // Build the data object for submission
    const data = {
      ownerId: this.trianerId,
      breakfast: extractVariants(this.Breakfast), // Only the variants
      lunch: extractVariants(this.Lunch),
      dinner: extractVariants(this.Dinner),
      day: this.dietForm.get('day')?.value,
    };
  
    // Log the data for debugging
    console.log('Data:', data);
  
    this.planService.addDailyDiet(data).subscribe(
      (response) => {
        console.log('Response:', response);
        this.toaster.success('Daily diet added successfully!');
        this.closeModal()
        
        
      },
      (error) => {
        console.error('Error:', error);
        this.toaster.error('Failed to add daily diet. Please try again.');
      }
    );
  }
  
  canAddFood(food:any){

  }
  addFoodToTracking(variantId: number, meal: string): void {
    // Find the correct variant by ID
    const variant = this.foods
      .flatMap((food) => food.variants)  // Flatten all variants
      .find((v) => v.id === variantId);

    if (!variant) {
      console.error('Variant not found');
      return;
    }

    // Find the corresponding food item
    const food = this.foods.find((f) => f.variants.includes(variant));

    if (!food) {
      console.error('Food not found');
      return;
    }

    // Create a MealEntry object containing the food name and the variant
    const mealEntry: MealEntry = {
      foodName: food.name,
      variant: variant,
    };

    // Add the MealEntry to the respective meal array
    switch (meal) {
      case 'breakfast':
        this.Breakfast.push(mealEntry); // Add to Breakfast
        this.dietForm.get('searchQueryBreakfast')?.setValue('');
        this.searchResultsBreakfast =[]
        break;
      case 'lunch':
        this.Lunch.push(mealEntry); // Add to Lunch
        this.dietForm.get('searchQueryLunch')?.setValue('');
        this.searchResultsLunch =[]
        break;
      case 'dinner':
        this.Dinner.push(mealEntry); // Add to Dinner
        this.dietForm.get('searchQueryDinner')?.setValue('');
        this.searchResultsDinner =[]
        break;
      default:
        console.error('Invalid meal type'); // Handle invalid cases
        break;
    }
  }
  removeFoodFromBreakFast(index: number): void {
    this.Breakfast.splice(index, 1);
   
    (this.dietForm.get('breakfast') as FormArray).removeAt(index);
  }
  removeFoodFromLunch(index: number): void {
    this.Lunch.splice(index, 1);
    
    (this.dietForm.get('lunch') as FormArray).removeAt(index);
  }
  removeFoodFromDinner(index: number): void {
    this.Dinner.splice(index, 1);
    
    (this.dietForm.get('dinner') as FormArray).removeAt(index);
  }

  searchFoods(keyword: string, meal: string): void {
    if (keyword.trim() !== '') {
      const results = this.foods.filter((food) =>
        food.name.toLowerCase().includes(keyword.toLowerCase())
      );
  
      switch (meal) {
        case 'breakfast':
          this.searchResultsBreakfast = results;
          break;
        case 'lunch':
          this.searchResultsLunch = results;
          break;
        case 'dinner':
          this.searchResultsDinner = results;
          break;
        default:
          break;
      }
    } else {
      switch (meal) {
        case 'breakfast':
          this.searchResultsBreakfast = [];
          break;
        case 'lunch':
          this.searchResultsLunch = [];
          break;
        case 'dinner':
          this.searchResultsDinner = [];
          break;
        default:
          break;
      }
    }
  }
  
}
