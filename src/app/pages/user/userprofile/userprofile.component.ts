import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user.model';
import { Trainer } from '../../../model/trainer.model';
import { ChatService } from '../../../services/chat.service';
import { ChatUserRegisterRequest } from '../../../model/chat.modle';

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
    private chatService:ChatService
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
        this.trianerId=this.trainer.id;
        console.log(this.trianerId,">>>>>>>>>>>");
        console.log(this.userId,".>>>>>>"); 
        
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
  registerChatUsers(){
    const data:ChatUserRegisterRequest={
      userId:this.userId,
      trainerId:this.trianerId,
      userFistName:this.user.firstName,
      userLastName:this.user.lastName,
      trainerFirstName:this.trainer.firstName,
      trainerLastName:this.trainer.lastName
    }
    
    
    this.chatService.registerUser(data).subscribe(
      (response)=>{
        console.log(response,">>>>>>>>");
        
      }
    )
  }


 edit(){
  this.router.navigateByUrl('/user/addProfile')
 }
 add(){
  this.router.navigateByUrl('/user/addProfile')
 }
 navigate(){
   this.registerChatUsers()
   this.router.navigateByUrl("/user/trainerConnect")
 }

}
