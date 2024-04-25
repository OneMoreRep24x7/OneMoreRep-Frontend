import { Component } from '@angular/core';
import { TrainerService } from '../../../services/trainer.service';
import { Trainer } from '../../../model/trainer.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.scss'
})
export class TrainersComponent {
  itemsPerPage = 5;
  currentPage = 1;
  trainers: Trainer[] = [];
  searchText: string = '';

  constructor(
    private service: TrainerService,
    private toster:ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllTrainers();
  }

 

  getAllTrainers(){
    this.service.getAllTrainers().subscribe(
      (response)=>{
        this.trainers = response;
        console.log(this.trainers,">>>>>>>>");

        
      }
    )
  }
  blockTrainer(trainerId:string){
    console.log(trainerId);
    this.service.blockTrainer(trainerId).subscribe(
      (response)=>{
        if(response.statusCode === 200){
          this.toster.success(response.message)
          this.getAllTrainers()
        }
      }
    )
    
  }
  unblockTrainer(trainerId:string){
    console.log(trainerId);
    this.service.unblockTrainer(trainerId).subscribe(
      (response)=>{
        if(response.statusCode === 200){
          this.toster.success(response.message)
          this.getAllTrainers()
        }
      }
    )
    
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.trainers.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
  search(): void {
    const searchQuery = this.searchText.trim();
    if (searchQuery === '') {
      this.getAllTrainers(); // If the search text is empty, retrieve all foods
    } else {
      this.trainers = this.trainers.filter(trainer =>
      trainer.firstName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }
}
