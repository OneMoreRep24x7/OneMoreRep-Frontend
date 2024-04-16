import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../../store/auth/auth.state';
import { LoginModel } from '../../../model/auth.model';
import { loginRequest } from '../../../store/auth/auth.action';
import { Observable, switchMap, timer } from 'rxjs';
import { User } from '../../../model/user.model';
import { selectError, selectUser } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  user$:Observable<User> |null;
  errorMessage$: Observable<string>;


  constructor(private service:AuthService,
    private formBuilder:FormBuilder,
    private router:Router,
    private store:Store<AuthState>){

    }

  ngOnInit(): void {
    window.scrollTo(0, 0);  
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password:this.formBuilder.control('',Validators.required)
    })
    this.user$ = this.store.pipe(select(selectUser));
    this.errorMessage$ = this.store.pipe(select(selectError))
  }
 proceedlogin(){
    console.log(this.loginForm.value);
    
    const {email,password} = this.loginForm.value;
    const credentials : LoginModel = {email,password};

    this.store.dispatch(loginRequest({data:credentials}))
    // timer(1 * 1000).pipe(
    //   switchMap(() => this.user$)
    // ).subscribe(user => {
    //   if (!user) {
    //     this.errorMessage = 'Invalid username or password';
    //   } else {
    //     this.errorMessage = ''; // Reset error message if user exists
    //   }
    // });
  }

}
