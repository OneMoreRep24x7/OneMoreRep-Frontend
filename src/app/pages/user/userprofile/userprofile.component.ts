import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user.model';
import { Trainer } from '../../../model/trainer.model';
import { PlanService } from '../../../services/plan.service';
import { TrainerService } from '../../../services/trainer.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent implements OnInit {

  user:User|null;
  userId:string | null;
  showConnectTrainerButton: boolean = false;
  trainer:Trainer| null;
  trianerId:string| null;
 

  constructor(
    private router:Router,
    private service:UserService,
    private trainerService:TrainerService,
    private planService:PlanService
    ){}


  ngOnInit(): void {
    window.scrollTo(0, 0);  
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.userId = this.user.id;
    this.service.getUserDetails(this.userId).subscribe((resposne)=>{
      console.log(resposne)
      this.user = resposne;
      this.checkTrainerValidity();
    })  
   
    this.service.getUserTrainer(this.userId).subscribe(
      (response)=>{
        
        this.trainer=response;
        console.log(this.trainer,">>>>>>>>>>>");
      }
    )
  
   
  }
  checkTrainerValidity() {
    if (this.user?.trainerValid) {
      const trainerValidDate = new Date(this.user.trainerValid);
      const currentDate = new Date();
      if (trainerValidDate > currentDate) {
        this.showConnectTrainerButton = true;
      }
    }
  }


 edit(){
  this.router.navigateByUrl('/user/addProfile')
 }
 add(){
  this.router.navigateByUrl('/user/addProfile')
 }
 navigate(){
   this.router.navigateByUrl("/user/trainerConnect")
 }

}
