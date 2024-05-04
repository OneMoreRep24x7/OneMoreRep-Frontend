import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PlanService } from '../../../services/plan.service';
import { User } from '../../../model/User.model';

@Component({
  selector: 'app-showplans',
  templateUrl: './showplans.component.html',
  styleUrl: './showplans.component.scss'
})
export class ShowplansComponent {
  user:User|null;
  userId:string|null;
  planForm: FormGroup;
  buttonText:string = "Select a plan";
  amount:number | null;
 

  constructor(private fb: FormBuilder,
    private toster:ToastrService,
    private service:PlanService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0); 
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.userId = this.user.id; 
    this.toster.toastrConfig.positionClass = 'toast-top-center'; 
    this.planForm = this.fb.group({
      selectedPlan: ['',Validators.required] 
    });
  }

  selectPlan(planText: string): void {
    this.planForm.get('selectedPlan').setValue(planText);
    this.buttonText = planText === 'Super Plan' ? 'Continue with Super Plan' : 'Continue with Premium Plan';
    
    
  }

  onSubmit(): void {
    const selectedPlan = this.planForm.get('selectedPlan').value;
    const trailValidDate = new Date(Date.parse(this.user.trialValid));
    const currentDate = new Date();
    
    if (!selectedPlan) {
        this.toster.error('Select any plan and continue');
        return;
    }

    else if (!this.user.premium) {
        // For non-premium users, proceed with payment
        if (selectedPlan === 'Super Plan') {
            this.amount = 149;
        } else if (selectedPlan === 'premium plan') {
            this.amount = 800;
        }

        this.service.createTransaction(this.amount).subscribe(
            (response) => {
                this.service.OpenTransactionModal(response, this.userId, this.amount);
            },
            (error) => {
                console.log(error);
            }
        );
        return;
    }

   else if (this.user.premium && trailValidDate < currentDate) {
        // If premium and trial validity has expired, proceed with payment
        if (selectedPlan === 'Super Plan') {
            this.amount = 149;
        } else if (selectedPlan === 'premium plan') {
            this.amount = 800;
        }

        this.service.createTransaction(this.amount).subscribe(
            (response) => {
                this.service.OpenTransactionModal(response, this.userId, this.amount);
            },
            (error) => {
                console.log(error);
            }
        );
        return;
    }

    // If premium and trial validity has not expired, show remaining validity days
    const differenceInTime = trailValidDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    this.toster.info(`You are already subscribed and your subscription ends in ${differenceInDays} days.`);
}

}
