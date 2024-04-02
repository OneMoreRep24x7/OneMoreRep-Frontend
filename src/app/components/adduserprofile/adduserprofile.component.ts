import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProfileRequest } from '../../model/profile.model';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { updateRequest } from '../../store/auth/auth.action';
import { AuthState } from '../../store/auth/auth.state';

@Component({
  selector: 'app-adduserprofile',
  templateUrl: './adduserprofile.component.html',
  styleUrl: './adduserprofile.component.scss'
})
export class AdduserprofileComponent implements OnInit {


  user$:User|null;
  userId : string | null;
  firstName:string | null;
  lastName:string | null;
  
  profileForm: FormGroup;
  preview: string = 'https://imgs.search.brave.com/SDvjesyFfC_6qOio8MKVLC8YzWLdAgSHXgDV2UCF_AA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS8xNDYt/MTQ2ODg0M19wcm9m/aWxlLWljb24tb3Jh/bmdlLXBuZy10cmFu/c3BhcmVudC1wbmcu/cG5n';
  image:File;
  constructor(
    private service : UserService,
    private formBuilder: FormBuilder,
    private router:Router,
    private store: Store<AuthState>,
    private toster:ToastrService
  ) {}


  ngOnInit(): void {
    this.user$ = JSON.parse(sessionStorage.getItem('user'));
    this.userId = this.user$.id;
    this.firstName = this.user$.firstName
    this.lastName = this.user$.lastName;
    console.log(this.firstName)
    
    this.profileForm = this.formBuilder.group({
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      age: ['', Validators.required],
      city: ['', Validators.required],
      activity: ['', Validators.required],
      conditions: ['', Validators.required],
      emotion: ['', Validators.required],
      height: ['', [Validators.required, Validators.min(50), Validators.max(300)]],
      weight: ['', [Validators.required, Validators.min(10), Validators.max(500)]],
      targetWeight: ['', [Validators.required, Validators.min(10), Validators.max(500)]]
    });
    
    
  }

  add(){
    if (this.profileForm.invalid) {
      
      this.markFormGroupTouched(this.profileForm);
      return; 
    }else if(this.profileForm.valid){
      const data : ProfileRequest = {
        id:this.userId,
        gender : this.profileForm.value.gender,
        age : this.profileForm.value.age,
        dailyActivity : this.profileForm.value.activity,
        emotionalHealth : this.profileForm.value.emotion,
        weight : this.profileForm.value.weight,
        phone : this.profileForm.value.phone,
        city : this.profileForm.value.city,
        medicalConditions : this.profileForm.value.conditions,
        height : this.profileForm.value.height,
        targetWeight : this.profileForm.value.targetWeight,
        

      }
      console.log(data);
      
      this.store.dispatch(updateRequest({data:data,file:this.image}))
      
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    let firstInvalidControl: AbstractControl | null = null;
  
    Object.values(formGroup.controls).forEach(control => {
      // Mark control as touched only if it's invalid and it's the first invalid control found
      if (control.invalid && !firstInvalidControl) {
        firstInvalidControl = control;
        control.markAsTouched();
      }
  
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
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
  onCancel(){
    this.router.navigateByUrl('/user/profile')
  }
}
