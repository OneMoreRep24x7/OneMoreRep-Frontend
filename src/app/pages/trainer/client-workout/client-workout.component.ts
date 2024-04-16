import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-workout',
  templateUrl: './client-workout.component.html',
  styleUrls: ['./client-workout.component.scss'] // corrected property name

})
export class ClientWorkoutComponent implements OnInit {
  date: Date = new Date(); 

  ngOnInit(): void {
    window.scrollTo(0, 0); 
    console.log(this.date, ">>>>>>>>>>");
  }
 

 

  handleDateSelect(event: any) {
    this.date = event.value; // Access the selected date from the event object
    console.log("Selected date:", this.date); // Example usage
  }
  
}
