import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";
import { state } from "@angular/animations";

export const selectAuthSate = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
    selectAuthSate,
    (state:AuthState)=> state.user
    
)


export const selectError = createSelector(
     selectAuthSate,
   (state:AuthState)=>state.error
)
