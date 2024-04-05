import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../../services/plan.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Food, RecipeVariant, VariantModel } from '../../../model/plan.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addvariant',
  templateUrl: './addvariant.component.html',
  styleUrl: './addvariant.component.scss'
})
export class AddvariantComponent implements OnInit {

  variantForm:FormGroup;
  foods: any[] = [];
  recipeId :number ;

  constructor(
    private service:PlanService,
    private formBuilder:FormBuilder,
    private toster:ToastrService){}

  ngOnInit(): void {
    this.fetchFoods();
    this.variantForm = this.formBuilder.group({
      recipeId: ['', Validators.required],
      unit:['',Validators.required],
      quantity:['',Validators.required],
      calories:['',Validators.required],
      protein:['',Validators.required],
      fat:['',Validators.required],
      carbs:['',Validators.required],
      fiber:['',Validators.required]
    })
  }

  fetchFoods(){
    this.service.getFoods().subscribe(
      (response:any[])=>{
        console.log(response);
        
        this.foods = response
        
      }
    )
  }
  addVariant(){
    if(this.variantForm.valid){
      const data : VariantModel ={
        unit:this.variantForm.value.unit,
        quantity:this.variantForm.value.quantity,
        calories:this.variantForm.value.calories,
        protein:this.variantForm.value.protein,
        fat:this.variantForm.value.fat,
        carbs:this.variantForm.value.carbs,
        fiber:this.variantForm.value.fiber
      }
      
      console.log("Data ", data);
      this.recipeId = parseInt(this.variantForm.value.recipeId)
      this.service.addVariant(data,this.recipeId).subscribe(
        (response)=>{
          
          if(response.statusCode == 200){
            this.toster.success(response.message);
          }
          
        }
      )
    }

  }

}
