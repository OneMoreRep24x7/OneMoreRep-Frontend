import { User } from "./User.model"

export interface AuthRes {
   message:string,
   statusCode:number
}

export interface LoginModel{
   email:string,
   password:string
}

export interface LoginResponse{
   user:User,
   accessToken:string,
   refreshToken:string
}