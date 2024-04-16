import { Component, OnInit } from '@angular/core';
import { Trainer } from '../../../model/trainer.model';
import { TrainerService } from '../../../services/trainer.service';

@Component({
  selector: 'app-showtrainers',
  templateUrl: './showtrainers.component.html',
  styleUrl: './showtrainers.component.scss'
})
export class ShowtrainersComponent implements OnInit{
  itemsPerPage = 3;
  currentPage = 1;
  proTrainers:Trainer[] | null;
  searchText:string|null;

  constructor(private trainerService:TrainerService){}

  ngOnInit(): void {
    window.scrollTo(0, 0); 
   this.getAllTrainers()
  }

   getAllTrainers(){
    this.trainerService.getAllTrainers().subscribe(
      (trainer:Trainer[])=>{
        this.proTrainers = trainer
      },(error)=>{
        console.log(error);
      }
    )
   }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.proTrainers.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
  search(){
    if (this.searchText.trim() === '') {
      this.getAllTrainers();
    } else {
    
      this.proTrainers = this.proTrainers.filter(trainer =>
        trainer.firstName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
}
