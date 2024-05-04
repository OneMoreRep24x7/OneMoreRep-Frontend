export interface ProfileRequest{
    id:string,
    gender:string,
    age:number,
    dailyActivity:string,
    emotionalHealth:string,
    phone:string,
    city:string,
    medicalConditions:string
    height:number,
    weight:number,
    
    
}

export interface ProfileResponse{
    id:string,
    gender:string,
    age:number,
    dailyActivity:string,
    emotionalHealth:string,
    phone:string,
    city:string,
    medicalConditions:string
    height:number,
    weight:number,
    targetWeight:number,
    imageName:string
}

export interface WorkoutModel{
    name:string,
    description:string,
    workoutCategory:string,
    durationMinutes:number,
    caloriesBurned:number,
    

}