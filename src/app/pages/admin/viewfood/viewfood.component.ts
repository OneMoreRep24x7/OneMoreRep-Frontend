import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from '../../../model/plan.model';
import { PlanService } from '../../../services/plan.service';

@Component({
  selector: 'app-viewfood',
  templateUrl: './viewfood.component.html',
  styleUrl: './viewfood.component.scss'
})
export class ViewfoodComponent implements OnInit {
  food: Food;
  foodId:number;

  constructor(
    private route: ActivatedRoute,
    private service:PlanService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
       this.foodId = params.id;
       this.service.getFoodById(this.foodId).subscribe((data)=>{
        this.food = data
        console.log(this.food,">>>>>>")
       })
    });
  }
}