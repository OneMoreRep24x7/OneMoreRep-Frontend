import { createAction, props } from "@ngrx/store";
import { LoginModel } from "../../model/auth.model";
import { User } from "../../model/User.model";
import { ProfileRequest } from "../../model/profile.model";

export const LOGIN_REQUEST = '[Auth] Login User';
export const LOGIN_SUCCESS = '[Auth] Login User Success';
export const LOGIN_FAILURE = '[Auth] Login User Failure';

export const UPDATE_REQUEST = '[Update] Update User';
export const UPDATE_SUCCESS = '[Update] Update User Success';
export const UPDATE_FAILURE = '[Update] Update User Failure';


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

  export const updateRequest = createAction(
   UPDATE_REQUEST,
   props<{data:ProfileRequest,file:File}>()
  )

  export const updateSuccess = createAction(
   UPDATE_SUCCESS,
   props<{ user: User }>()
  )

  export const updateFailure = createAction(
   UPDATE_FAILURE,
   props<{error:Error}>()
  )
