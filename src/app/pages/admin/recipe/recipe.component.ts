import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanService } from '../../../services/plan.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit{
  itemsPerPage = 5;
  currentPage = 1;
  foods: any[] = [];
  searchText: string = '';

  constructor(
    private router: Router,
    private service: PlanService
  ) {}

  ngOnInit(): void {
    this.getAllFoods();
  }

  addFood() {
    this.router.navigateByUrl("/admin/addRecipe");
  }

  getAllFoods() {
    this.service.getFoods().subscribe(
      (response: any[]) => {
        console.log(response);
        this.foods = response;
      }
    );
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.foods.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
  search(): void {
    const searchQuery = this.searchText.trim();
    if (searchQuery === '') {
      this.getAllFoods(); // If the search text is empty, retrieve all foods
    } else {
      this.foods = this.foods.filter(food =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }
  

}
