import { Component, OnInit } from '@angular/core';
import { Trainer } from '../../../model/trainer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from '../../../services/plan.service';
import { User } from '../../../model/User.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-client-diet',
  templateUrl: './client-diet.component.html',
  styleUrl: './client-diet.component.scss'
})
export class ClientDietComponent implements OnInit{
   trainer:Trainer|null;
   trainerId:string|null;
   userId:string|null;
   user:User|null;
   dietPlans:any[]|null = [];
   itemsPerPage = 2;
   currentPage = 1;

   constructor(
    private route:ActivatedRoute,
    private planService:PlanService,
    private userService:UserService,
    private router:Router
   ){}

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.trainer = JSON.parse(sessionStorage.getItem('user'));
    this.trainerId = this.trainer.id;
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
    });
    this.getUserDetails()
    this.getDietPlans()
  }
  getDietPlans(){
    const data = {
      userId:this.userId,
      trainerId:this.trainerId
    }
    this.planService.getDietPlan(data).subscribe(
      (response)=>{
        console.log(response,"Response>>>>>");
        this.dietPlans = response;
        
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
    return this.dietPlans.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  addDietPlans(){
    this.router.navigate(['/trainer/addClientDietPlans'], { queryParams: { id: this.userId} });
  }

}
