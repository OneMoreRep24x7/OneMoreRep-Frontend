import { createReducer, on } from "@ngrx/store";
import { initalState } from "./auth.state";
import { loginFailure, loginSuccess } from "./auth.action";



export const authReducer = createReducer(
    initalState,
    on(loginSuccess,(state,{user})=>{
        return {
        ...state,
        isLoggedIn:true,
        user:user,error:null
    }
    }),
    on(loginFailure,(state,{error})=>{
        return{
            ...state,
            isLoggedIn:false,
            user:null,error:error.message
        }
    })
   
)