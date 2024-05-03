import { Component, HostListener, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TrainerService } from '../../services/trainer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {


  isMenuScrolled = false;
  isSideBarShowing = false;
  user:any|null;
  userRole: string;
  userId:string;
  isDropdownOpen = false;
  
  constructor(
    private router: Router,
    private userService:UserService,
    private trainerService:TrainerService) {}
  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.user = user;
      this.userId = this.user.id;
      this.userRole = user.role;
       // Assuming 'role' is the key for user's role
       if(this.userRole === "USER"){
        this.getUserDetails()
       }if(this.userRole === "TRAINER"){
        this.getTrainerDetails()
       }
      
    }
  }
  getUserDetails(){
    this.userService.getUserDetails(this.userId).subscribe(
      (response)=>{
        this.user = response;
        
        
      }
    )
  }
  getTrainerDetails(){
    this.trainerService.getTrainerById(this.userId).subscribe(
      (response)=>{
        this.user = response.trainer;
      }
    )
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null;
  }
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    // Clear user data from session storage
    sessionStorage.removeItem('user');
    localStorage.clear();
    // Redirect to the login page or any other appropriate page
    this.router.navigate(['/login']);
  }

  @HostListener('window:scroll',['$event'])
  scrollCheck(){

    if(window.pageYOffset>120){
      this.isMenuScrolled = true;
    }else{
      this.isMenuScrolled = false;
    }

   

  }

  openSideBar(){
    this.isSideBarShowing = true;
  }

  closeSideBar(){
    this.isSideBarShowing = false;
  }
  navigateToProfile(){
    if(this.user.role === "USER"){
      this.router.navigateByUrl("/user/profile");
    }else if(this.user.role === "TRAINER"){
      this.router.navigateByUrl("/trainer/profile");
    }
    
  }

}
