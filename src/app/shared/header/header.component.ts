import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isMenuScrolled = false;
  isSideBarShowing = false;

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
