import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.state';
import { LoginModel } from '../../model/auth.model';
import { loginRequest } from '../../store/auth/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;


  constructor(private service:AuthService,
    private formBuilder:FormBuilder,
    private router:Router,
    private store:Store<AuthState>){

    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:this.formBuilder.control('',Validators.required),
      password:this.formBuilder.control('',Validators.required)
    })
  }
 proceedlogin(){
    console.log(this.loginForm.value);
    
    const {email,password} = this.loginForm.value;
    const credentials : LoginModel = {email,password};

    this.store.dispatch(loginRequest({data:credentials}))
  }

}
