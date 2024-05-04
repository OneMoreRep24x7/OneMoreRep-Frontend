import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trainer, TrainerProfileRequest } from '../../../model/trainer.model';
import { TrainerService } from '../../../services/trainer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-addprofile',
  templateUrl: './addprofile.component.html',
  styleUrl: './addprofile.component.scss'
})
export class AddprofileComponent  implements OnInit{
  
  trainer: Trainer | null;
  trainerId: string | null;
  isEditMode: boolean = false;
  image: File | null;
  profileForm: FormGroup;
  preview: string = 'https://imgs.search.brave.com/SDvjesyFfC_6qOio8MKVLC8YzWLdAgSHXgDV2UCF_AA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS8xNDYt/MTQ2ODg0M19wcm9m/aWxlLWljb24tb3Jh/bmdlLXBuZy10cmFu/c3BhcmVudC1wbmcu/cG5n';
 
  constructor(
    private service:TrainerService,
    private router:Router,
    private formBuilder:FormBuilder,
    private toster:ToastrService,
    private trainerServie:TrainerService){}

  ngOnInit(): void {
    window.scrollTo(0, 0);  
    this.trainer = JSON.parse(sessionStorage.getItem('user'));
    this.trainerId = this.trainer.id;
    this.profileForm = this.formBuilder.group({
      qualification :['',Validators.required],
      slots:['',Validators.required]
    })
    this.service.getTrainerById(this.trainerId).subscribe(
      (response)=>{
        this.trainer = response.trainer;
        
        this.initializeForm()
        
      }
    )
  }

  initializeForm() {
    if (this.trainer && this.trainer.qualifications) {
      this.profileForm = this.formBuilder.group({
       qualification:[this.trainer.qualifications || '',Validators.required],
       slots:[this.trainer.slots || '',Validators.required]
      });
  
      if (this.trainer.imageName) {
        this.preview = this.trainer.imageName;
      }
      this.isEditMode = true; 
    } 
  }


  onCancel(){
    this.router.navigateByUrl("/trainer/profile")
  }
  add(){
    if(this.profileForm.valid){
      const data : TrainerProfileRequest ={
        id:this.trainerId,
        qualification :this.profileForm.value.qualification,
        slots : this.profileForm.value.slots
      
      }

      
      this.service.addTrainerProfile(data,this.image).subscribe(
        (response)=>{
          console.log(response);
          if(response.statusCode === 200){
            this.toster.success("Profile Added successfully...")
            this.router.navigateByUrl("/trainer/profile");
            
          }
          
        }
      )
    }

  }
  edit(){
     
     if(this.profileForm.valid){
      const data :TrainerProfileRequest ={
        id:this.trainerId,
        qualification:this.profileForm.value.qualification,
        slots:this.profileForm.value.slots
      }
      this.trainerServie.editTrainerProfile(data).subscribe(
        (response)=>{
          if(response.statusCode === 200){
            this.toster.success(response.message);
            window.location.reload();
          }else{
            this.toster.error(response.message)
          }
        }
      )
      
     }
     
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      this.preview = reader.result as string;
      this.image = file;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}
