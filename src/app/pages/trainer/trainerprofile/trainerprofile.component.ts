import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CertificateModalComponent } from '../certificate-modal/certificate-modal.component';
import { TrainerService } from '../../../services/trainer.service';
import { Certificate, Trainer } from '../../../model/trainer.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-trainerprofile',
  templateUrl: './trainerprofile.component.html',
  styleUrls: ['./trainerprofile.component.scss']
})
export class TrainerprofileComponent implements OnInit {
  trainer: Trainer | null;
  trainerId: string | null;
  images: { imageSrc: string, imageAlt: string }[] | null;
 

  constructor(private router: Router,
              private service: TrainerService,
              private toster: ToastrService) {
  }

  @ViewChild(CertificateModalComponent) certificateModal!: CertificateModalComponent;

  ngOnInit(): void {
    window.scrollTo(0, 0);  
    this.trainer = JSON.parse(sessionStorage.getItem('user'));
    this.trainerId = this.trainer.id;
    this.service.getTrainerCertificates(this.trainerId).subscribe(
      (response: Certificate[]) => {
        this.images = response.map(certificate => {
          return {
            imageSrc: certificate.imageName,
            imageAlt: `Certificate ${certificate.id}`
          };
        });
        console.log('Images:', this.images);
      },
      (error) => {
        console.error('Error fetching certificates:', error);
        this.toster.error('Failed to fetch certificates.');
      }
    );
    this.service.getTrainerById(this.trainerId).subscribe(
      (response)=>{
        this.trainer = response.trainer;
        
        
      }
    )
  }

  add() {
    this.router.navigateByUrl("/trainer/addProfile");
  }
  edit(){
    this.router.navigateByUrl("/trainer/addProfile")
  }

  openCertificateModal() {
    this.certificateModal.openModal();
  }



  uploadCertificate(file: File) {
    this.service.uploadCertificate(file, this.trainerId).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this.toster.success(response.message);
          window.location.reload();
        } else {
          this.toster.error(response.message);
        }
      },
      (error) => {
        this.toster.error(error); // Show error message in toastr
      }
    );
  }
  

  onUploadAndCloseModal(file: File) {
    this.uploadCertificate(file); // Call the service method
    this.certificateModal.closeModal(); // Close the modal
  }
}
