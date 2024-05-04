import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input('size')
  size: 'L' |'S'|'M' = 'S';
  @Input('shade')
  shade: 'L'|'D'|'W' = 'L' // D,L,W,NA

  @Input('animation')
  animation: 'F'|'C' = 'F' 

  @Input('name')
  name:'';

}
