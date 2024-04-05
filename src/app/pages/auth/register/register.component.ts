import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../model/user.model';
import { RegisterRequest } from '../../../model/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
      

      this.service.register(data).subscribe((response)=>{
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

  registerWithGoogle(){
    this.service.getGoogleAuthUrl().subscribe(
      (urlDto: any) => {
        if (urlDto && urlDto.authURL) {
          // Extract the URL from the UrlDto object
          const url = urlDto.authURL;
          // Redirect the user to the Google authentication URL
          window.location.href = url;
        } else {
          console.error('Invalid response from server:', urlDto);
          this.toster.error("Invalid response from server")
        }
      },
      (error) => {
         console.error('Error generating Google authentication URL:', error);
         this.toster.error("Error generateing Google authentication Url")
      }
    );
  }
}
