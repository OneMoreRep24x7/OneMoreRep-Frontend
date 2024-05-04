import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeVariant } from '../../../model/plan.model';
import { PlanService } from '../../../services/plan.service';

@Component({
  selector: 'app-recipevariant',
  templateUrl: './recipevariant.component.html',
  styleUrl: './recipevariant.component.scss'
})
export class RecipevariantComponent implements OnInit {

  foodVariant:RecipeVariant[];
  itemsPerPage = 5;
  currentPage = 1;
  searchText: string = '';

  constructor(
    private router:Router,
    private service:PlanService){}

  ngOnInit(): void {
    this.getAllVariant()
    
  }
 
  getAllVariant(){
    this.service.getAllVariant().subscribe(
      (response)=>{
        console.log(response,">>>>>")
        this.foodVariant = response
        console.log(this.foodVariant[0].recipeName,"---------");  
      }
    )
  }
  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.foodVariant.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
  search(): void {
    if (this.searchText.trim() === '') {
      this.getAllVariant();
    } else {
    
      this.foodVariant = this.foodVariant.filter(food =>
        food.recipeName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  addVarient(){
     this.router.navigateByUrl("/admin/addFoodVariant")
  }
}
