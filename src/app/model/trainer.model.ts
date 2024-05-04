import { User } from "./user.model";

export interface Trainer{
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    slots:number,
    clients:number,
    qualifications:string,
    imageName:string
    certificates:Certificate[],
    users:User[]
   
} 

export class CertificateDto {
    message: string;
    statusCode: number;
  }

 

export interface Certificate {
    id: number;
    imageName: string;
   
  }
  
export interface TrainerProfileRequest{
    id:string,
    qualification:string;
    slots:number;
}
export interface TrainerProfileResponse{
    trainer:Trainer,
    message:string,
    statusCode:number
}

