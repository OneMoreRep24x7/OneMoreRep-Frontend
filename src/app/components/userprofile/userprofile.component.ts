import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent implements OnInit {

  user:User|null;
  

  constructor(
    private router:Router,
    private service:UserService,
    ){}


  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
 
   
  }
 edit(){
  this.router.navigateByUrl('/user/addProfile')
 }
}
