import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeVariant } from '../../../model/plan.model';
import { PlanService } from '../../../services/plan.service';

@Component({
  selector: 'app-recipevariant',
  templateUrl: './recipevariant.component.html',
  styleUrl: './recipevariant.component.scss'
})
export class RecipevariantComponent implements OnInit {

  foodVariant:RecipeVariant[];

  constructor(
    private router:Router,
    private service:PlanService){}

  ngOnInit(): void {
    this.getAllVariant()
    
  }
 
  getAllVariant(){
    this.service.getAllVariant().subscribe(
      (response)=>{
        console.log(response,">>>>>")
       
        

        this.foodVariant = response
        console.log(this.foodVariant[0].recipeName,"---------");
        
       
      
        
      }
    )
  }
  addVarient(){
     this.router.navigateByUrl("/admin/addFoodVariant")
  }
}
