import { User } from "../../model/user.model";


export interface AuthState{
    user:User | null;
    error: string | null
    isLoggedIn:boolean 
}

export const initalState : AuthState ={
    user:null,
    error:null,
    isLoggedIn:false
}