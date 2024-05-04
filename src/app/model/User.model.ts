import { Trainer } from "./trainer.model"

export interface User {
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    phone:string|null,
    role:string|null,
    gender:string|null,
    age:number|null,
    city:string|null,
    dailyActivity:string|null,
    medicalConditions:string|null,
    emotionalHealth:string|null,
    height:number|null,
    weight:number|null,
    targetWeight:number|null,
    imageName:string|null,
    premium:boolean|null,
    trialValid:string |null,
    trainerValid:string|null,
    trainer: Trainer | null; 
    bmi:number|null;
    

}

export interface TragetWeightResponse{
    startRange:number|null,
    endRange:number|null
}

export interface TrackingDetails{
    userId:string|null;
    primaryGoal:string|null;
    targetWeight:number|null;
    caloriesNeeded:number|null;
    workoutBurn:number|null;
    caloriesBurned:number|null;
    waterIntake:number|null;
    caloriesEaten:number|null;
    waterConsumed:number|null;
}

export interface TrackingDetailsResponse{
    details:TrackingDetails|null;
    message:string|null;
    statusCode:number|null;
}

