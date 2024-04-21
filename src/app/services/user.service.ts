import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileRequest } from '../model/profile.model';
import { Observable, tap } from 'rxjs';
import { CommonResponse, EditResponse, LoginResponse } from '../model/auth.model';
import { Route, Router } from '@angular/router';
import { TrackingDetailsResponse, TragetWeightResponse, User } from '../model/user.model';
import { Trainer, TrainerProfileRequest, TrainerProfileResponse } from '../model/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(
    private http : HttpClient,
    private router:Router
  ) { }

  getUserDetails(userId:string):Observable<User> {
    const url = `api/v1/user/getDetails?userId=${userId}`;
   return this.http.get<User>(url)
  }

  updateProfile(profileRequest:ProfileRequest,file:File): Observable<LoginResponse>{
    const formData: FormData = new FormData();
    formData.append('file', file); // Append the file
    formData.append('profileRequest', JSON.stringify(profileRequest));
   
    return this.http.post<LoginResponse>("api/v1/user/add",formData).pipe(
      tap(response=>{
        const user = response?.user;
        console.log(response.user);
        this.router.navigateByUrl('/user/profile')
     
      },error=>{

      })
    )
  }
  editUserProfile(data: ProfileRequest):Observable<EditResponse>{
    return this.http.post<EditResponse>("api/v1/user/editUser",data)
  }
  getUserTrainer(userId: string):Observable<Trainer> {
    const url = `api/v1/user/getUserTrainer?userId=${userId}`
    return this.http.get<Trainer>(url);
  }

  findUserBMI(userId: string) :Observable<CommonResponse>{
    const url =`api/v1/user/saveBMI?userId=${userId}`
    return this.http.get<any>(url);
  }
  findUserTargetWeight(userId:string):Observable<TragetWeightResponse> {
    const url = `api/v1/user/getTargetWeightRange?userId=${userId}`
    return this.http.get<TragetWeightResponse>(url);
  }
  getTrackingDetails(userId: string) :Observable<TrackingDetailsResponse>{
   const url = `api/v1/tracking/getTrackingDetails?userId=${userId}`;
   return this.http.get<TrackingDetailsResponse>(url);
  }
 
  updateWaterIntake(data: { userId: string; waterConsumed: number; }):Observable<TrackingDetailsResponse> {
   return this.http.post<TrackingDetailsResponse>("api/v1/tracking/updateWaterConsumed",data);
  }
  updateWorkoutTracking(caloriesData: { userId: string; caloriesBurned: any; }):Observable<TrackingDetailsResponse> {
    return this.http.post<TrackingDetailsResponse>("api/v1/tracking/updateCaloriesBurned",caloriesData);
  }
  updateFoodTracking(caloriesData: { userId: string; caloriesEaten: any; }):Observable<TrackingDetailsResponse> {
    return this.http.post<TrackingDetailsResponse>("api/v1/tracking/updateCaloriesEaten",caloriesData)
  }

  getTrainerByUserId(userId: string):Observable<TrainerProfileResponse> {
    const url = `api/v1/user/getTrainerById?userId=${userId}`;
    return this.http.get<TrainerProfileResponse>(url);
  }
 
}
