import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../model/User.model';
import { AuthRes, LoginModel, LoginResponse } from '../model/auth.model';

const TEST_URL = ["http://localhost:8080/check"]

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  UserRegistration(userdata: User) {
      throw new Error("Method not implemented.");
  }
  private readonly _ACCESS_TOKEN_KEY = 'accessToken'
  private readonly _REFRESH_TOKEN_KEY = 'refreshToken'

  constructor(private http:HttpClient) { }


  

  register(registerRequest:FormData) :Observable<AuthRes>{
    return this.http.post<AuthRes>('auth/register',registerRequest)
  } 

  login(loginRequest:LoginModel): Observable<LoginResponse>{
    console.log('>>>>>>>>comming')
    return this.http.post<LoginResponse>("auth/authenticate",loginRequest).pipe(
      tap(response=>{
        const user = response?.user;
        console.log(response.user);
        //navigate
      },error=>{

      })
    )
  }

  setAccessToken(token:string){
    localStorage.setItem(this._ACCESS_TOKEN_KEY,token)
  }
  setRefreshToken(token:string){
    localStorage.setItem(this._REFRESH_TOKEN_KEY,token);
  }

  getAccessToken():string | null {
    return localStorage.getItem (this._ACCESS_TOKEN_KEY);
  }
  getRefreshToken():string | null{
    return localStorage.getItem(this._REFRESH_TOKEN_KEY)
  }



  getMessage():Observable<any>{
    return this.http.get(TEST_URL+"/hello",{
      headers:this.createAuthorizationHeader()
    })
  }
  private createAuthorizationHeader() {
    const jwtToken = localStorage.getItem("JWT");
    if(jwtToken){
      return new HttpHeaders().set(
        'Authorization','Bearer '+jwtToken
      )
    }else{
      console.log("JWT token not found in the local storage")
    }
    return null;
  }
}
