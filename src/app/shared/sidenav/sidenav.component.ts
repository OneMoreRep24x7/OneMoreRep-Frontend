import { Component, EventEmitter, Input, Output } from '@angular/core';



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {



  collapsed:boolean = false;
  @Input() navData: any[] = [];
  @Input() logoText: string;
  @Input() logoIcon: string;
  screenWidth = 0;

  toggleCollapse():void{
    this.collapsed= !this.collapsed;
 
  }

  closeSidenav():void{
    this.collapsed = false;
   
  }
}
