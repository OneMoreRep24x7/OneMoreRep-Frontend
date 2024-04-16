import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanService } from '../../../services/plan.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkoutModel } from '../../../model/profile.model';

@Component({
  selector: 'app-addworkout',
  templateUrl: './addworkout.component.html',
  styleUrl: './addworkout.component.scss'
})
export class AddworkoutComponent implements OnInit{
  workoutForm:FormGroup;
  preview: string | ArrayBuffer | null = null;
  video: File | null = null;

  constructor(
    private service:PlanService,
    private router:Router,
    private toster:ToastrService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.workoutForm = this.formBuilder.group({
      workoutname:['',Validators.required],
      description:['',Validators.required],
      duration:['',Validators.required],
      caloriesburned:['',Validators.required],
      workoutcategory:['',Validators.required]
    })

    
   
    
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      this.preview = reader.result;
      this.video = file;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  addWorkout(){
    console.log("Form Submitted!")
    if (this.workoutForm.valid) {
      const data: WorkoutModel = {
           name: this.workoutForm.value.workoutname,
          description: this.workoutForm.value.description,
          durationMinutes: this.workoutForm.value.duration,
          caloriesBurned: this.workoutForm.value.caloriesburned,
          workoutCategory:this.workoutForm.value.workoutcategory
      
      }
      console.log(data,">>>>>>>");
      console.log(this.video,">>>>>>>>");

      this.service.addWorkout(data,this.video).subscribe(
        (response)=>{
          console.log(response,">>>>>");
          if(response.statusCode === 200){
            this.toster.success(response.message);
            this.workoutForm.reset();
            window.scrollTo(0, 0); 
            window.location.reload();
          }else{
            this.toster.error(response.message)
          }
          
        }
      )
      
      
    }
  
      

  }

}
