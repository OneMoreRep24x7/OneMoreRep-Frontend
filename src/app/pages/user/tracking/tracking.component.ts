import { Component } from '@angular/core';
const navbarData = [
  {
      routerLink: "/user",
      icon: 'fal fa-home',
      label: 'Dashboard'
  }
];
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.scss'
})
export class TrackingComponent {
 navbarData = navbarData;
 logoText:string = "Tracking"
 logoIcon:string = "T"

}
