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

}

