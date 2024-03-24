import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap, switchMap, map, catchError, of } from "rxjs";
import { loginRequest, loginSuccess, loginFailure, LOGIN_SUCCESS } from "./auth.action";
import { Action } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { Injectable } from "@angular/core";


@Injectable()
export class AuthEffects{
constructor(
    private _actions$:Actions,
    private http:HttpClient,
    private service:AuthService,
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
          return loginFailure({ error: new Error('Invalid response') });
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

}

