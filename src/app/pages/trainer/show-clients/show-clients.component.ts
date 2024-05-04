import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Trainer } from '../../../model/trainer.model';
import { TrainerService } from '../../../services/trainer.service';
import { User } from '../../../model/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-clients',
  templateUrl: './show-clients.component.html',
  styleUrl: './show-clients.component.scss'
})
export class ShowClientsComponent implements OnInit {

  trainer:Trainer|null;
  trainerId:string|null;
  clients:User[] | null;
  constructor(
    private service:TrainerService,
    private renderer: Renderer2, 
    private el: ElementRef,
    private router:Router){}

  ngOnInit(): void {
    window.scrollTo(0, 0); 
    this.trainer = JSON.parse(sessionStorage.getItem('user'));
    this.trainerId= this.trainer.id;
    this.service.getTrainerById(this.trainerId).subscribe(
      (response)=>{
        this.trainer = response.trainer;
        
        this.clients = this.trainer.users;
       
      }
    )  
    
  }

  showUserDetails(client: User): void {
    // Clear previous content
    const userDetails = this.el.nativeElement.querySelector('#userDetails');
    userDetails.innerHTML = '';

    // Create elements dynamically and append them
    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, 'flex');
    this.renderer.addClass(div, 'flex-col');
    this.renderer.addClass(div, 'items-center');

    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'src', client.imageName);
    this.renderer.addClass(img, 'h-40');
    this.renderer.addClass(img, 'w-40');
    this.renderer.addClass(img, 'md:h-52');
    this.renderer.addClass(img, 'md:w-52');
    this.renderer.addClass(img, 'rounded-full');
    this.renderer.addClass(img, 'object-cover');
    this.renderer.appendChild(div, img);

    const h1 = this.renderer.createElement('h1');
    const firstNameText = this.renderer.createText(client.firstName);
    const lastNameText = this.renderer.createText(client.lastName);
    const spaceText = this.renderer.createText(' '); // Create a whitespace text node
    const firstNameSpan = this.renderer.createElement('span');
    const lastNameSpan = this.renderer.createElement('span');

    this.renderer.appendChild(firstNameSpan, firstNameText);
    this.renderer.appendChild(firstNameSpan, spaceText); // Append the whitespace text node
    this.renderer.appendChild(firstNameSpan, lastNameSpan);
    this.renderer.appendChild(h1, firstNameSpan);
    this.renderer.addClass(firstNameSpan, 'text-4xl');
    this.renderer.addClass(firstNameSpan, 'md:text-5xl');
    this.renderer.addClass(firstNameSpan, 'font-bold');
    this.renderer.addClass(firstNameSpan, 'text-orange-500');

    this.renderer.appendChild(lastNameSpan, lastNameText);
    this.renderer.addClass(lastNameSpan, 'text-white');

    this.renderer.appendChild(div, h1);




    const button = this.renderer.createElement('button');
    const buttonText = this.renderer.createText('Show Details');
    this.renderer.appendChild(button, buttonText);
    this.renderer.addClass(button, 'bg-gray-500');
    this.renderer.addClass(button, 'text-white');
    this.renderer.addClass(button, 'px-4');
    this.renderer.addClass(button, 'py-2');
    this.renderer.addClass(button, 'rounded');
    this.renderer.addClass(button, 'mt-4');
    this.renderer.listen(button, 'click', () => this.showDetails(client));
    this.renderer.appendChild(div, button);

    this.renderer.appendChild(userDetails, div);


     }
     showDetails(client:User){
        const clientId = client.id;
        this.router.navigate(['/trainer/clientPlans'], { queryParams: { id: clientId } });
      }

}
