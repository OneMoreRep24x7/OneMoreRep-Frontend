import { User } from "./User.model"





export interface AuthRes {
   message:string,
   statusCode:number
   isVerified:boolean
   user:User,
   role:string
}

export interface LoginModel{
   email:string,
   password:string
}

export interface LoginResponse{
   user:User,
   accessToken:string,
   refreshToken:string,
   message:string,
   statusCode:number,
   role:string
}

export interface RegisterRequest {
   firstName: string;
   lastName: string;
   email: string; // Corrected field name
   password: string;

 }
export interface GoogleAuthUrlResponse {
   authURL: string;
 }
 export interface EditResponse{
   user:User;
   message:string;
   statusCode:number
 }
 export interface CommonResponse{
   message:string,
   statusCode:number
 }