export interface FoodModel{
    name:string;
    description:string;
    category:string;
}

export interface FoodRes{
    recipe:Food;
    message:string;
    statusCode:number

}

export interface Food {
    id: number;
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    variants: RecipeVariant[];
}

  export interface RecipeVariant {
    id: number;
    recipeName: string; 
    unit: string;
    quantity: number;
    calories:number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
}

  export interface VariantModel{
    
    unit: string;
    quantity: number;
    calories:number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
  }

  export interface VariantRes{
    recipeVariant:RecipeVariant
    message:string,
    statusCode:number
  }


  export interface Workout{
     id:number,
     name:string,
     workoutCategory:string
     description:string,
     videoUrl:string,
     durationMinues:number,
     caloriesBurned:number
  }

  export interface WorkoutRes{
    workout:Workout,
    message:string,
    statusCode:number
  }
  export interface TransactionDetails{
    paymentId:string;
    currency:string;
    amount:number;
    key:string;
  }
  export interface PaymentResponse{
    payment:TransactionDetails,
    message:string,
    statusCode:number
  }

  export interface DailyWorkout{
    ownerId:string,
    day:string,
    workoutType:string,
    workouts:Workout[]
  }



  