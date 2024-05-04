import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../../../model/plan.model';
import { PlanService } from '../../../services/plan.service';
import { User } from '../../../model/User.model';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrl: './food-details.component.scss'
})
export class FoodDetailsComponent {
  user:User|null;
  userId:string|null;
  foodId: number | null = null; 
  food:Food|null;
  selectedVariantId: number; 
  selectedVariant: any = null;

  constructor(
    private route: ActivatedRoute,
    private planService:PlanService,
    private userService:UserService,
    private router:Router,
    private toaster:ToastrService) {}

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.userId = this.user.id;
    this.foodId = parseInt(this.route.snapshot.paramMap.get('id'),10);
    console.log(this.foodId);
    this.getFoodDetails()
    
  }
  getFoodDetails(){
    this.planService.getFoodById(this.foodId).subscribe((data)=>{
      this.food = data
      console.log(this.food,">>>>>>")
     })
  }
  
  
onVariantSelect(event: any) {
  const variantId = parseInt(event.target.value, 10);
  this.selectedVariant = this.food.variants.find((variant) => variant.id === variantId);
}
 


  addFoodToTracking() {
  
    const data = {
      userId:this.userId,
      variantId:this.selectedVariant.id
    };

  
    this.planService.updateFoodTracking(data).subscribe(
      (response)=>{
        console.log(response,">>>>Response From Plan Service");
        if(response.statusCode === 200){
          this.router.navigateByUrl("/user/caloriesEaten")
        }
        
      },(error)=>{
        this.toaster.error(error);
      }
    )
   
    
  }
  

}
