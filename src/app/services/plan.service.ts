import { Injectable } from '@angular/core';
import { DailyWorkout, Food, FoodModel, FoodRes, FoodTrackingResponse, FoodTrackingResponses, PaymentResponse, TrackingRequest, TransactionDetails, VariantModel, VariantRes, WorkoutPlanParams, WorkoutPlanRequest, WorkoutPlanResponse, WorkoutRes, WorkoutTrackingResponse } from '../model/plan.model';
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
  getWorkoutPlans(data: { userId: string; trainerId: string; }):Observable<any[]> {
    return this.http.post<any[]>("api/v1/plans/getTrainerWorkoutPlan",data);
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
  removeFoodFromTracking(data: {  userId: string; variantId: any; }):Observable<CommonResponse> {
   return this.http.post<CommonResponse>("api/v1/plans/removeFoodFromTracking",data)
  }
 
 
  getDailyWorkoutByDate(data: WorkoutPlanRequest):Observable<WorkoutPlanResponse> {
    return this.http.post<WorkoutPlanResponse>("api/v1/plans/getWorkoutPlan",data);
  }
  getTrackedFood(userId: string):Observable<FoodTrackingResponses[]>{
    const url = `api/v1/plans/getLatestFoodTracking?userId=${userId}`;
    return this.http.get<FoodTrackingResponses[]>(url);
  }
  addDailyDiet(data: { ownerId: string; breakfast: any[]; lunch: any[]; dinner: any[]; day: any; }):Observable<CommonResponse> {
   return this.http.post<CommonResponse>("api/v1/plans/addDailyDiet",data);
  }
  getDailyDiet(trainerId:string):Observable<any[]> {
    const url = `api/v1/plans/getDailyDiet?ownerId=${trainerId}`
    return this.http.get<any[]>(url);
  }
  getAllDailyDiets():Observable<any[]> {
    return this.http.get<any[]>("api/v1/plans/getAllDailyDiet")
  }

  addDietPlans(data: { userId: string; trainerId: string; startDate: any; planName: any; repeat: any; dailyDiets: any[];  userFullName: string; trainerFullName: string; userEmail: string; userPhoneNumber: string; }):Observable<CommonResponse> {
    return this.http.post<CommonResponse>("api/v1/plans/addDietPlan",data);
  }
  getDietPlan(data: { userId: string; trainerId: string; }):Observable<any[]> {
   return this.http.post<any[]>("api/v1/plans/getTrainerDietPlan",data);
  }
  getDailyDietByDate(data: { date: string; userId: string; trainerId: string; }):Observable<any> {
    return this.http.post<any>("api/v1/plans/getDietPlan",data);
  }
  getTotalPayment():Observable<any> {
    return this.http.get<any>("api/v1/plans/getTotalPayment")
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
