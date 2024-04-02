import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit {
 
  otpForm !: FormGroup
  email:string;

  constructor(
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private toster:ToastrService){}

  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      otp:['', Validators.required]
    })

      // Retrieve user object from the state parameter
      this.email = this.route.snapshot.paramMap.get('email');
      console.log(this.email);
  }

  proceedVerification(){
    if(this.otpForm.valid){
      const otp = this.otpForm.value.otp; // Get OTP value from the form
      
      this.authService.verifyOtp(otp,this.email).subscribe((response)=>{
        console.log(response)
        if(response.statusCode == 200){
        
          this.router.navigate(['login'])
          this.toster.success(response.message);
        }else if(response.statusCode == 403){
          this.toster.error(response.message);
        }
      })
    }

  }

}
