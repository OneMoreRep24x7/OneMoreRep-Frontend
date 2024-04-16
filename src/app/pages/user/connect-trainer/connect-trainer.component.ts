import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainerService } from '../../../services/trainer.service';
import { Trainer } from '../../../model/trainer.model';

@Component({
  selector: 'app-connect-trainer',
  templateUrl: './connect-trainer.component.html',
  styleUrl: './connect-trainer.component.scss'
})
export class ConnectTrainerComponent implements OnInit {
  trainer:Trainer|null;
  trainerId: string;

  constructor(private route: ActivatedRoute,
    private trainerService:TrainerService) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.trainerId = params['trainerId'];
    });
    this.trainerService.getTrainerById(this.trainerId).subscribe((data) => {
      this.trainer = data.trainer;
      console.log(this.trainer,">>>>>>>")
    })

  }
}
