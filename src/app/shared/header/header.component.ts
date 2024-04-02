import { Component, HostListener, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {


  isMenuScrolled = false;
  isSideBarShowing = false;

  userRole: string;
  
  constructor(private router: Router) {}
  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userRole = user.role; // Assuming 'role' is the key for user's role
    }
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null;
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

    console.log(this.isMenuScrolled)

  }

  openSideBar(){
    this.isSideBarShowing = true;
  }

  closeSideBar(){
    this.isSideBarShowing = false;
  }

}
