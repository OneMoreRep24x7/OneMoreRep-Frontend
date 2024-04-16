import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent  implements OnInit ,OnChanges{
 
  
  
  @Input('message') message:string = ''

  @Input('show') showModal: boolean = false;

  @Output('close') onClose = new EventEmitter()

  disableBodyScrolling(){
  document.body.style.setProperty('overflow','hidden')
  }
  enableBodyScrolling(){
    document.body.style.setProperty('overflow','scroll')
  }
  ngOnInit(): void {
   
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.init()
  }
  init(){
    if(this.showModal){
      this.disableBodyScrolling()
    }
  }
 
  closeModal(){
    this.enableBodyScrolling()
    this.onClose.emit()
  }
}
