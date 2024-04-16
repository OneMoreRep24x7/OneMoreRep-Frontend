import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-certificate-modal',
  templateUrl: './certificate-modal.component.html',
  styleUrls: ['./certificate-modal.component.scss']
})
export class CertificateModalComponent implements OnInit {

  isOpen: boolean = false;

  @Output() uploadAndCloseModalEvent = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);  
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadAndCloseModalEvent.emit(file); // Emit event when upload button is pressed
  }
}
