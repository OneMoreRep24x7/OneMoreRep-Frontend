import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.scss'
})
export class UserdashboardComponent implements OnInit{
  message:string = '';


  

  constructor(private service:AuthService){}

  ngOnInit(): void {
    
  }

  getMessage(){
    this.service.getMessage().subscribe(
      (response)=>{
           this.message = response.message;
           console.log(this.message)
      }
    )
  }

}
