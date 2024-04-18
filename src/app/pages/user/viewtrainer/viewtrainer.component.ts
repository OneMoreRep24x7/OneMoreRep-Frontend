import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainerService } from '../../../services/trainer.service';
import {  Trainer } from '../../../model/trainer.model';
import { User } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';
import { PlanService } from '../../../services/plan.service';
import { ToastrService } from 'ngx-toastr';
import { CommunicationService } from '../../../services/communication.service';


@Component({
  selector: 'app-viewtrainer',
  templateUrl: './viewtrainer.component.html',
  styleUrl: './viewtrainer.component.scss'
})
export class ViewtrainerComponent {
  user:User| null;
  userId:string|null;
  trainer:Trainer | null;
  trainerId : string | null;
  images: { imageSrc: string, imageAlt: string }[] | null;
  showModal:boolean = false;
  popUp:boolean = false;
  message:string = "You are currently in free trail.Subcribe to OneMoreRep to enjoy premium features"
  selectedOption: string = '';
  trainerFees:number|null;
  showBuyTrainerButton: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private service:TrainerService,
    private userService:UserService,
    private planService:PlanService,
    private toaster:ToastrService,
    private communicationService:CommunicationService
    ) { }

    ngOnInit(): void {
      window.scrollTo(0, 0);  
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.userId = this.user.id;

      this.route.params.subscribe(params => {
        this.trainerId = params.id;
        this.service.getTrainerById(this.trainerId).subscribe((data) => {
          this.trainer = data.trainer;
          this.images = []; // Initialize the images array
          if (data.trainer.certificates) {
            data.trainer.certificates.forEach((certificate) => {
              // Push each certificate image into the images array
              this.images.push({
                imageSrc: certificate.imageName,
                imageAlt: "certficate"
              });
            });
          }
          this.checkBuyTrainerButton();
        });
      });
      this.userService.getUserDetails(this.userId).subscribe(
        (response)=>{
          this.user = response
          
            
            
          
        }
      )
      this.communicationService.connect()
    }
  
    check(): void {
      const trainerValidDate= new Date(Date.parse(this.user.trainerValid));
      const currentDate = new Date();
      console.log(trainerValidDate,">>>>>>");
      
      if(trainerValidDate > currentDate){
        const differenceInTime = trainerValidDate.getTime() - currentDate.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        this.toaster.info(`You are already purchased a trainer and your validity ends in ${differenceInDays} days.`)
      }
      else if(!this.user.premium){
        this.showModal = true
      }else{
        this.showSelectModal()
      }
    
      
      
    }
    onNextStep() {
      
      console.log('Selected option:', this.selectedOption);
      if(this.selectedOption === 'plan-1'){
        this.trainerFees = 1000;
        console.log(this.trainerFees);
        
      }else if(this.selectedOption === 'plan-2'){
        this.trainerFees = 8000
        console.log(this.trainerFees);
        
      }else{
        this.trainerFees = 12000
        console.log(this.trainerFees);
        
      }
      
      this.closeModal()

      this.planService.createTransaction(this.trainerFees).subscribe(
        (response)=>{
       
          this.planService.OpenTransactionTrainerModal(response,this.userId,this.trainerId,this.trainerFees);
        },(error)=>{
          console.log(error);
          
        }

      )
    }
    checkBuyTrainerButton() {
      if (this.trainer && this.trainer.users.some(u => u.id === this.userId)) {
        this.showBuyTrainerButton = true;
      }
    }

    showSelectModal() {
      this.popUp = true;
    }
  
    closeModal() {
      console.log("close popup callled");
      
      this.popUp = false;
    }
  
    closePopup(): void {
     this.showModal =false
    }

}
