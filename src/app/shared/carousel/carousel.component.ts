import { Component, Input, OnInit } from '@angular/core';

interface carouselImages{
  imageSrc:string;
  imageAlt:string;

}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit {

  @Input() images:carouselImages[] =[]

  @Input() indicators = true;

  selectedIndex = 0;

  ngOnInit(): void {

  }
  selectImage(index:number):void{
    this.selectedIndex = index;
  }


}
