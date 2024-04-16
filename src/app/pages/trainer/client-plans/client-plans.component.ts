import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-client-plans',
  templateUrl: './client-plans.component.html',
  styleUrl: './client-plans.component.scss'
})
export class ClientPlansComponent {
  clientId:string | null;
  user:User|null;
  data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Calories Eaten',
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Light orange
        borderColor: 'rgba(255, 99, 132, 1)', // Orange
        borderWidth: 1,
        data: [2200, 2500, 2000, 2350, 1800, 2100, 1900]
      },
      {
        label: 'Calories Burned',
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Light blue
        borderColor: 'rgba(54, 162, 235, 1)', // Blue
        borderWidth: 1,
        data: [200, 250, 500, 600, 180, 290, 550]
      }
    ]
  };
  
  options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  

constructor(
  private route: ActivatedRoute,
  private service:UserService,
  private router:Router) {}

ngOnInit() {
  window.scrollTo(0, 0); 
    this.route.queryParams.subscribe(params => {
        this.clientId = params['id'];
       
    });
    this.service.getUserDetails(this.clientId).subscribe((resposne)=>{
      console.log(resposne)
      this.user = resposne;
     
    })  
   
}

 addWorkout(){
  console.log("Hello...................");
  this.router.navigateByUrl("/trainer/clientWorkout")
  
 }
 addDiet(){
  console.log("Diet added.....");
  
 }

      

}
