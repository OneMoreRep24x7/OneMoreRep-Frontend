import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProfileRequest } from '../../../model/profile.model';
import { User } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';
import { updateRequest } from '../../../store/auth/auth.action';
import { AuthState } from '../../../store/auth/auth.state';
import { selectError } from '../../../store/auth/auth.selectors';

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
  isEditMode: boolean = false;
  errorMessage$: Observable<string>;
  
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
    window.scrollTo(0, 0);  
    this.user$ = JSON.parse(sessionStorage.getItem('user'));
    this.userId = this.user$.id;

      this.profileForm = this.formBuilder.group({
        gender: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        age: ['', Validators.required],
        city: ['', Validators.required],
        activity: ['', Validators.required],
        conditions: ['', Validators.required],
        emotion: ['', Validators.required],
        height: ['', [Validators.required, Validators.min(50), Validators.max(300)]],
        weight: ['', [Validators.required, Validators.min(10), Validators.max(500)]]
      });
  
    this.service.getUserDetails(this.userId).subscribe((response) => {
      console.log(response); // Ensure that the response contains the expected user details
      this.user$ = response;
  
      // Populate the form with user details if they exist
      this.initializeForm();
      
    });
   
    
  }
  
  initializeForm() {
    if (this.user$ && this.user$.dailyActivity) {
      this.profileForm = this.formBuilder.group({
        gender: [this.user$.gender || '', Validators.required],
        phone: [this.user$.phone || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        age: [this.user$.age || '', Validators.required],
        city: [this.user$.city || '', Validators.required],
        activity: [this.user$.dailyActivity || '', Validators.required],
        conditions: [this.user$.medicalConditions || '', Validators.required],
        emotion: [this.user$.emotionalHealth || '', Validators.required],
        height: [this.user$.height || '', [Validators.required, Validators.min(50), Validators.max(300)]],
        weight: [this.user$.weight || '', [Validators.required, Validators.min(10), Validators.max(500)]]
      });
  
      if (this.user$.imageName) {
        this.preview = this.user$.imageName;
       
      }
      this.isEditMode = true; 
    } 
    this.errorMessage$ = this.store.pipe(select(selectError))
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
        height : this.profileForm.value.height
        

      }
      console.log(data);
      
      this.store.dispatch(updateRequest({data:data,file:this.image}))
      
    }
  }
  edit(){
    if(this.profileForm.valid){
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
        height : this.profileForm.value.height
      }
      console.log(data,">>>>>>>");
      console.log(this.image,">>>>>");
      this.service.editUserProfile(data).subscribe(
        (response)=>{
          if(response.statusCode === 200){
            this.toster.success(response.message)
            window.location.reload();
          }else{
            this.toster.error(response.message)
          }
        }
      )
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    let firstInvalidControl: AbstractControl | null = null;
  
    Object.values(formGroup.controls).forEach(control => {
      
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
