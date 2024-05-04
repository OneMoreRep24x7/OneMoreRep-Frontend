import { Component, OnInit } from '@angular/core';
import { TrackingDetails, User } from '../../../model/User.model';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
const navbarData = [
  {
      routerLink: "/user",
      icon: 'fal fa-home',
      label: 'Dashboard'
  }
];
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.scss'
})
export class TrackingComponent implements OnInit {

 navbarData = navbarData;
 logoText:string = "Tracking"
 logoIcon:string = "T"
 user:User|null;
 userId:string|null;
 trackingDetails:TrackingDetails|null;

 constructor(
  private userService:UserService,
  private rotuer:Router){

 }

 ngOnInit(): void {
  window.scrollTo(0, 0);
  this.user = JSON.parse(sessionStorage.getItem('user'));
  this.userId = this.user.id;
  this.getUserDetails();
  this.getTrackingDetails();
}
 getTrackingDetails(){
  this.userService.getTrackingDetails(this.userId).subscribe(
    (respone)=>{
      if(respone.statusCode === 200){
        this.trackingDetails = respone.details;
      }
    }
  )
 }
 getUserDetails(){
  this.userService.getUserDetails(this.userId).subscribe(
    (response)=>{
      this.user = response
    }
  )
 }

 trackCaloriesEaten(){
  if(this.trackingDetails){
    this.rotuer.navigateByUrl("/user/caloriesEaten");
  }else if(this.user.height === null && this.user.weight === null){
    this.rotuer.navigateByUrl("/user/addProfile");
  }else{
    this.rotuer.navigateByUrl("user/trackingDeatils");
  }
 }

 trackCaloriesBurned(){
  if(this.trackingDetails){
    this.rotuer.navigateByUrl("/user/caloriesBurned");
  }else if(this.user.height === null && this.user.weight === null){
    this.rotuer.navigateByUrl("/user/addProfile");
  }else{
    this.rotuer.navigateByUrl("user/trackingDeatils");
  }

 }

 trackWaterIntake(){
  if(this.trackingDetails){
    this.rotuer.navigateByUrl("/user/waterIntake")
  }else if(this.user.height === null && this.user.weight === null){
    this.rotuer.navigateByUrl("/user/addProfile");
  }else{
    this.rotuer.navigateByUrl("user/trackingDeatils");
  }

 }
 trackWeight(){
  if(this.trackingDetails){
    this.rotuer.navigateByUrl("/user/weightTracking");
  }else if(this.user.height === null && this.user.weight === null){
    this.rotuer.navigateByUrl("/user/addProfile");
  }else{
    this.rotuer.navigateByUrl("user/trackingDeatils");
  }
 }

}
