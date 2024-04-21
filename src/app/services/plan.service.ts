import { Injectable } from '@angular/core';
import { DailyWorkout, Food, FoodModel, FoodRes, FoodTrackingResponse, PaymentResponse, TrackingRequest, TransactionDetails, VariantModel, VariantRes, WorkoutPlanParams, WorkoutRes, WorkoutTrackingResponse } from '../model/plan.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { WorkoutModel } from '../model/profile.model';
import { Router } from '@angular/router';
import { CommonResponse } from '../model/auth.model';




declare var Razorpay:any;
@Injectable({
  providedIn: 'root'
})
export class PlanService {
  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  addFood(data: FoodModel, foodImage: File): Observable<FoodRes> {
    const formData: FormData = new FormData();
    formData.append('file', foodImage);
    formData.append('recipeRequest', JSON.stringify(data)); // No need to stringify
  
    return this.http.post<FoodRes>("api/v1/plans/addRecipe", formData);
  }
  getFoods() :Observable<any[]> {
    return this.http.get<any[]>("api/v1/plans/getRecipes")
  }

  getWorkouts():Observable<any[]> {
    return this.http.get<any[]>("api/v1/plans/getWorkouts")
  }
  
  addVariant(data: VariantModel,recipeId:number) :Observable<VariantRes> {
    const url = `api/v1/plans/addRecipeVariant?recipeId=${recipeId}`;
    console.log(data,'>>>>>>>')
    return this.http.post<VariantRes>(url,data)
  }

  getAllVariant(): Observable<any> {
    return this.http.get("api/v1/plans/getRecipeVariant").pipe(
      tap(response => {
        console.log("Response from getAllVariant():", response);
      })
    );
  }
  

  addWorkout(data: WorkoutModel, video: File):Observable<WorkoutRes> {
    const formData:FormData = new FormData();
    formData.append('file',video);
    formData.append('workoutRequest',JSON.stringify(data))
    console.log(formData);
    
   return this.http.post<WorkoutRes>("api/v1/plans/addWorkout",formData)
  }

  getFoodById(foodId: number) :Observable<Food>{
    const url = `api/v1/plans/getRecipeById?foodId=${foodId}`;
   return this.http.get<Food>(url);
  }
  addDailyWorkout(data:DailyWorkout):Observable<CommonResponse>{
    return this.http.post<CommonResponse>("api/v1/plans/addDailyWorkout",data);
   }

   getDailyWorkouts(trainerId:string):Observable<any[]>{
    const url = `api/v1/plans/getDailyWorkouts?ownerId=${trainerId}`;
    return this.http.get<any[]>(url)
  }

  addWorkoutPlans(data: WorkoutPlanParams):Observable<CommonResponse> {
    return this.http.post<CommonResponse>("api/v1/plans/addWorkoutPlan",data);
  }
  getWorkoutPlans(trainerId: string):Observable<any[]> {
    const url = `api/v1/plans/getTrainerWorkoutPlan?trainerId=${trainerId}`;
    return this.http.get<any[]>(url)
  }
  
  setPrimaryGoal(data: TrackingRequest):Observable<CommonResponse> {
    return this.http.post<CommonResponse>("api/v1/tracking/setPrimaryGoal",data)
  }
  updateWorkoutTracking(data: { userId: string; workout: any; }):Observable<WorkoutTrackingResponse> {
   return this.http.post<WorkoutTrackingResponse>("api/v1/plans/updateWorkoutTracking",data);
  }
  getTrackingDeatils(userId: string):Observable<WorkoutTrackingResponse>{
    const url = `api/v1/plans/getLatestWorkoutTracking?userId=${userId}`;
    return this.http.get<WorkoutTrackingResponse>(url);
  }
  removeWorkoutFromTracking(data: { userId: string; workout: any; }):Observable<CommonResponse>{
   return this.http.post<CommonResponse>("api/v1/plans/removeWorkoutFromTracking",data);
  }
  updateFoodTracking(data: { userId: string; variantId: any; }):Observable<FoodTrackingResponse> {
    return this.http.post<FoodTrackingResponse>("api/v1/plans/updateFoodTracking",data);
  }
 


 
  
  createTransaction(amount: number): Observable<TransactionDetails> {
    return this.http.get<TransactionDetails>(`api/v1/plans/createTransaction?amount=${amount}`);
  }

  OpenTransactionModal(response:any,userId:string,amount:number){
    var options ={
      order_id: response.orderId,
      key:response.key,
      amount:response.amount,
      currency:response.currency,
      name:'OneMoreRep Fitness',
      description:'Payment of plan purchase',
      image:'https://cdn.pixabay.com/photo/2024/01/10/05/32/ai-generated-8498914_640.jpg' ,
      handler:(response:any)=>{
        if(response!=null &&response.razorpay_payment_id!=null){
          console.log(response,">>>>>>>>>>>>++");
          
          this.processResponse(response,userId,amount)
        }else{
          alert("Payment Failed!")
        }
        
      },
      prefill:{
        name: 'Test User',
        email: 'test@example.com',
        contact: '9999999999'
      },
      notes:{
        address:'Near Asset Homes Kazhakootam, Trivandram'
      },
      theme: {
        color: '#FF6347' // Darker shade of orange
    }  
    }
   
    const razorPayObject = new Razorpay(options);
    razorPayObject.open()
  }
  processResponse(resp:any,userId:string,amount:number){
    const data = {
      payment_id: resp.razorpay_payment_id,
      userId: userId,
      amount: amount
    };
    console.log(data,">>>>>>>");
    
    this.http.post<PaymentResponse>('api/v1/plans/saveAppPayment', data)
    .subscribe(response => {
      console.log('Response from backend:', response);
      if(response.statusCode === 200){
          console.log(response.payment.paymentId,">>>>>>>");
          
          this.router.navigate(["/user/paymentSuccess", { orderId: response.payment.paymentId }]);
      }
    }, error => {
      console.error('Error occurred:', error);
      // Handle error if needed
    });
    
  }


  OpenTransactionTrainerModal(response:any,userId:string,trainerId:string,amount:number){
    var options ={
      order_id: response.orderId,
      key:response.key,
      amount:response.amount,
      currency:response.currency,
      name:'OneMoreRep Fitness',
      description:'Payment of plan purchase',
      image:'https://cdn.pixabay.com/photo/2024/01/10/05/32/ai-generated-8498914_640.jpg' ,
      handler:(response:any)=>{
        if(response!=null &&response.razorpay_payment_id!=null){
          console.log(response,">>>>>>>>>>>>++");
          
          this.processTrainerResponse(response,userId,trainerId,amount)
        }else{
          alert("Payment Failed!")
        }
        
      },
      prefill:{
        name: 'Test User',
        email: 'test@example.com',
        contact: '9999999999'
      },
      notes:{
        address:'Near Asset Homes Kazhakootam, Trivandram'
      },
      theme: {
        color: '#FF6347' // Darker shade of orange
    }  
    }
   
    const razorPayObject = new Razorpay(options);
    razorPayObject.open()
  }

  processTrainerResponse(resp:any,userId:string,trainerId:string,amount:number){
    const data = {
      payment_id: resp.razorpay_payment_id,
      userId: userId,
      trainerId:trainerId,
      amount: amount
    };
    console.log(data,">>>>>>>");
    
    this.http.post<PaymentResponse>('api/v1/plans/saveTrainerPayment', data)
    .subscribe(response => {
      console.log('Response from backend:', response);
      if(response.statusCode === 200){
          console.log(response.payment.paymentId,">>>>>>>");
          
          this.router.navigate(["/user/trainerPayment", { orderId: response.payment.paymentId }]);
      }
    }, error => {
      console.error('Error occurred:', error);
      // Handle error if needed
    });
    
  }

  
  
  
}
