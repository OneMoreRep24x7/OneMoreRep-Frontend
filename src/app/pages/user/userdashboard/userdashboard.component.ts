import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Trainer } from '../../../model/trainer.model';
import { TrainerService } from '../../../services/trainer.service';
import { TrackingDetails, User } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';
import {  ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class UserdashboardComponent implements OnInit{
  message:string = '';
  proTrainers:Trainer[] | null;
  user:User|null;
  userId:string|null;
  trackingDetails:TrackingDetails |null;
  


  

  constructor(private service:AuthService,
              private trainerService:TrainerService,
              private userService:UserService,
              private toster:ToastrService,
              private router:Router){}

  ngOnInit(): void {
    window.scrollTo(0, 0);  

    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.userId = this.user.id;
    this.trainerService.getAllTrainers().subscribe(
      (trainer:Trainer[])=>{
        this.proTrainers = trainer
      },(error)=>{
        console.log(error);
      }
    )
    this.userService.getUserDetails(this.userId).subscribe(
      (response)=>{
        this.user = response
      }
    )
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
 

  getMessage(){
    this.service.getMessage().subscribe(
      (response)=>{
           this.message = response.message;
           console.log(this.message)
      }
    )
  }
  checkStatus(){
      if(this.user === null){
        this.router.navigateByUrl("/login")
      }
    
      if(this.user.premium){
        const trailValidDate = new Date(Date.parse(this.user.trialValid));
        const currentDate = new Date();
        const differenceInTime = trailValidDate.getTime() - currentDate.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        this.toster.info(`You are already subscribed and your subcribtion ends in ${differenceInDays} days.`)
      }else{
        const trailValidDate = new Date(Date.parse(this.user.trialValid));
        const currentDate = new Date();
        const differenceInTime = trailValidDate.getTime() - currentDate.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        console.log(trailValidDate,">>>>");
        
        this.toster.warning(`You are in a free trial and your free trial ends in ${differenceInDays} days.`);
      }
  }
  addTrackingDetails() {
    if(this.user.weight && !this.trackingDetails ) {
        this.router.navigateByUrl("/user/trackingDeatils");
    }else if (this.user.height  && this.trackingDetails) {
        this.router.navigateByUrl("/user/tracking");
    }else {
        // Navigate to "/user/addProfile" if user.height is null and trackingDetails is null
        this.router.navigateByUrl("/user/addProfile");
    }
}


}
