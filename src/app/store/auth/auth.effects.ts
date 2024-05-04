import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap, switchMap, map, catchError, of } from "rxjs";
import { loginRequest, loginSuccess, loginFailure, LOGIN_SUCCESS, updateRequest, updateSuccess, updateFailure, UPDATE_SUCCESS } from "./auth.action";
import { Action } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { Injectable } from "@angular/core";
import { UserService } from "../../services/user.service";


@Injectable()
export class AuthEffects{
constructor(
    private _actions$:Actions,
    private http:HttpClient,
    private service:AuthService,
    private userService:UserService
    ){

}

login$ = createEffect(() => 
this._actions$.pipe(
  ofType(loginRequest),
  switchMap((action) => {
    const loginData = action.data;
    return this.service.login(loginData).pipe(
      map((response: any) => {
        if (response && response.user) {
          return loginSuccess({ user: response.user });
        } else {
          return loginFailure({ error: new Error('User not registerd or Invalid Password!') });
        }
      }),
      catchError((error) => of(loginFailure({ error })))
    );
  }),
  tap((action) => {
    if (action.type === LOGIN_SUCCESS) {
      sessionStorage.setItem('user', JSON.stringify(action.user));
    }
  }),
  
)
);

update$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateRequest),
      switchMap((action) => {
        const updateData = action.data;
        const file = action.file;
        return this.userService.updateProfile(updateData,file).pipe(
          map((response: any) => {
            if (response && response.user) {
              return updateSuccess({ user: response.user });
            } else {
              return updateFailure({ error: new Error('Failed to update profile!') });
            }
          }),
          catchError((error) => of(updateFailure({ error })))
        );
      }),
      tap((action) => {
        if (action.type === UPDATE_SUCCESS) {
          sessionStorage.setItem('user',JSON.stringify(action.user))
        }
      })
    )
  );

}

