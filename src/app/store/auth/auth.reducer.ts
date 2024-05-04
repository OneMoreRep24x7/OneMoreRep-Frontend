import { createReducer, on } from "@ngrx/store";
import { initalState } from "./auth.state";
import { loginFailure, loginSuccess, updateFailure, updateSuccess } from "./auth.action";
import { state } from "@angular/animations";



export const authReducer = createReducer(
    initalState,
    on(loginSuccess,(state,{user})=>{
        return {
        ...state,

        isLoggedIn:true,
        user:user,
        error:null
        
    }
    }),
    on(loginFailure,(state,{error})=>{
        return{
            ...state,
            isLoggedIn:false,
            user:null,error:error.message
            
            
        }
    }),
    on(updateSuccess,(state,{user})=>{
        return {
        ...state,

        isLoggedIn:true,
        user:user,
        error:null
        
    }
    }),
    on(updateFailure, (state, { error }) => {
        return {
            ...state,
            isLoggedIn: false,
            error: error.message
        };
    }),
    
   
)