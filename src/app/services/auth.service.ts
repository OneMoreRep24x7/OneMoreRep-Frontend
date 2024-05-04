import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { AuthRes, LoginModel, LoginResponse, RegisterRequest } from '../model/auth.model';
import { Router } from '@angular/router';

const TEST_URL = ["http://localhost:8080/check"]

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  test() {
    console.log(">>>>>sending")
    return this.http.get<any>('api/v1/auth/test')
  }


  
 
  private readonly _ACCESS_TOKEN_KEY = 'accessToken'
  private readonly _REFRESH_TOKEN_KEY = 'refreshToken'

  constructor(private http:HttpClient,
    private router:Router) { }

    getGoogleAuthUrl() :Observable<string> {
      return this.http.get<string>('api/v1/auth/url')
    }

  register(registerRequest: RegisterRequest): Observable<AuthRes> {
    console.log(registerRequest);
    return this.http.post<AuthRes>('api/v1/auth/register', registerRequest).pipe(
      catchError(error => {
        // Handle error here
        console.error('Error during registration:', error);
        return throwError(error); // Rethrow the error
      })
    );
  }

  regiserTrainer(registerRequest:RegisterRequest) : Observable<AuthRes>{
    console.log(registerRequest)
    return this.http.post<AuthRes>('api/v1/auth/registerTrainer',registerRequest).pipe(
      catchError(error=>{
        return throwError(error);
      })
    )
  }
  


  verifyOtp(otp: string, email:string): Observable<AuthRes> {
    const requestData = { otp, email };
    console.log(email,otp+">>>>>>>>>");
    return this.http.post<AuthRes>('api/v1/auth/verifyOtp', requestData);
  }

  login(loginRequest:LoginModel): Observable<LoginResponse>{
   
    return this.http.post<LoginResponse>("api/v1/auth/authenticate",loginRequest).pipe(
      tap(response=>{
        const user = response?.user;
        console.log(response.user);
        if(response.statusCode === 200){
          if(response.role === "USER"){
            this.router.navigateByUrl('/')
          }else if(response.role === "TRAINER"){
            this.router.navigateByUrl('/trainer')
          }else{
            this.router.navigateByUrl('/admin')
          }
          
        }
      },error=>{

      })
    )
  }


  setAccessToken(token:string){
    sessionStorage.setItem(this._ACCESS_TOKEN_KEY,token)
  }
  setRefreshToken(token:string){
    sessionStorage.setItem(this._REFRESH_TOKEN_KEY,token);
  }

  getAccessToken():string | null {
    return sessionStorage.getItem (this._ACCESS_TOKEN_KEY);
  }
  getRefreshToken():string | null{
    return sessionStorage.getItem(this._REFRESH_TOKEN_KEY)
  }



 
}
