import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanService } from '../../../services/plan.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FoodModel } from '../../../model/plan.model';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrl: './addrecipe.component.scss'
})
export class AddrecipeComponent implements OnInit {
  preview: string | ArrayBuffer | null = null;
  foodImage: File | null = null;

  foodForm:FormGroup;
  
  constructor(
    private planService:PlanService,
    private formBuilder:FormBuilder,
    private router:Router,
    private toster:ToastrService
  ) { }
  ngOnInit(): void {
    this.foodForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['',Validators.required],
      category: ['', Validators.required] 
    })
    
  }
  
  onFileSelected(event: any): void {
      const file: File = event.target.files[0];
      const reader: FileReader = new FileReader();
  
      reader.onload = () => {
          this.preview = reader.result;
          this.foodImage = file;
      };
  
      if (file) {
          reader.readAsDataURL(file);
      }
  }

  addFood(){
    if(this.foodForm.valid){
      const data : FoodModel={
        name : this.foodForm.value.name,
        description :this.foodForm.value.description,
        category:this.foodForm.value.category
        
      }
      console.log("Data: ", data);
      console.log("Food Image: ", this.foodImage);

      
     this.planService.addFood(data,this.foodImage).subscribe((response)=>{
       if(response.statusCode === 200){
        this.toster.success(response.message);
        this.router.navigateByUrl("/admin/recipe");
       }else{
        this.toster.error(response.message);
       }
     })
    }

  }
  

}
