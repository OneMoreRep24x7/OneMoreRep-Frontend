import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from '../../../services/plan.service';
import { Trainer } from '../../../model/trainer.model';
import { User } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-client-workout',
  templateUrl: './client-workout.component.html',
  styleUrls: ['./client-workout.component.scss'] // corrected property name

})
export class ClientWorkoutComponent implements OnInit {
  date: Date = new Date(); 
  userId:string | null;
  user:User|null;
  trainer:Trainer|null;
  trainerId:string|null;
  workoutPlans:any[]|null;
  itemsPerPage = 2;
  currentPage = 1;


  constructor(
   private router:Router,
   private route:ActivatedRoute,
   private planService:PlanService,
   private userService:UserService){}

  ngOnInit(): void {
    window.scrollTo(0, 0); 
    this.trainer = JSON.parse(sessionStorage.getItem('user'));
    this.trainerId= this.trainer.id;
    console.log(this.date, ">>>>>>>>>>");
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
    });
  
   this.getAllWorkoutPlans()
   this.getUserDetails()
  }

  getAllWorkoutPlans(){
    const data = {
      userId : this.userId,
      trainerId:this.trainerId
    }

    this.planService.getWorkoutPlans(data).subscribe(
      (response)=>{
        console.log(response,"workoutplans>>>>>>>>>>>>>>");
        this.workoutPlans = response
        
      }
     )
  }
  getUserDetails(){
    this.userService.getUserDetails(this.userId).subscribe(
      (response)=>{
        this.user = response;
        console.log(this.user);
        
      }
    )
  }
 
  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.workoutPlans.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
  // search(): void {
  //   if (this.searchText.trim() === '') {
  //     this.getAllWorkoutPlans();
  //   } else {
    
  //     this.workoutPlans = this.workoutPlans.filter(workout =>
  //       workout.name.toLowerCase().includes(this.searchText.toLowerCase())
  //     );
  //   }
  // }

 

  
  addWorkout(){
    this.router.navigate(['/trainer/addClientPlans'], { queryParams: { id: this.userId} });
  }
  
}
