import { createAction, props } from "@ngrx/store";
import { LoginModel } from "../../model/auth.model";
import { User } from "../../model/User.model";

const LOGIN_REQUEST = '[Auth] Login User';
export const LOGIN_SUCCESS = '[Auth] Login User Success';
export const LOGIN_FAILURE = '[Auth] Login User Failure';

export const loginRequest = createAction(
   LOGIN_REQUEST,
   props<{data:LoginModel}>()
)

export const loginSuccess = createAction(
   LOGIN_SUCCESS ,
    props<{ user: User }>()
  );
  
  export const loginFailure = createAction(
   LOGIN_FAILURE,
    props<{ error: Error }>()
  );