import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterRequest } from '../../../model/auth.model';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-trainer-register',
  templateUrl: './trainer-register.component.html',
  styleUrl: './trainer-register.component.scss'
})
export class TrainerRegisterComponent implements OnInit{
  registerForm: FormGroup;

  constructor(
    private service : AuthService,
    private formBuilder: FormBuilder,
    private store: Store,
    private router:Router,
    private toster:ToastrService
  ) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  private passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get("confirmPassword")?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get("confirmPassword")?.setErrors(null);
    }
  }
  proceedregister() {
    if(this.registerForm.valid){
      const data: RegisterRequest = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };

      this.service.test().subscribe((response)=>{
        console.log(response)
      })
      

      this.service.regiserTrainer(data).subscribe((response)=>{
        console.log(response);
        
        
        if(response.statusCode == 200){
          const user : User = response.user;
          const email = user.email;
          this.router.navigate(['otp',email] )
          this.toster.success(response.message);

        }else if(response.statusCode == 409){
          this.toster.error(response.message);
        }

      });
    }
  }

}
