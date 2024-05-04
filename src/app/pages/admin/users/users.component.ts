import { Component } from '@angular/core';
import { User } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  itemsPerPage = 5;
  currentPage = 1;
  users: User[] = [];
  searchText: string = '';

  constructor(
   
    private service: UserService,
    private toster:ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsers()
  }

 

  getAllUsers(){
    this.service.getAllUsers().subscribe(
      (response)=>{
        this.users = response;
        console.log(this.users);
        
      }
    )
  }
  blockTrainer(userId:string){
    
    this.service.blockUser(userId).subscribe(
      (response)=>{
        if(response.statusCode === 200){
          this.toster.success(response.message)
          this.getAllUsers()
        }
      }
    )
    
  }
  unblockTrainer(userId:string){
    
    this.service.unblockTrainer(userId).subscribe(
      (response)=>{
        if(response.statusCode === 200){
          this.toster.success(response.message)
          this.getAllUsers()
        }
      }
    )
    
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.users.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
  search(): void {
    const searchQuery = this.searchText.trim();
    if (searchQuery === '') {
      this.getAllUsers(); // If the search text is empty, retrieve all foods
    } else {
      this.users = this.users.filter(user =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }
}
