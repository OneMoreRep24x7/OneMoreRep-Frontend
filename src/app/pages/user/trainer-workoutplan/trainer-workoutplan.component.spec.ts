import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerWorkoutplanComponent } from './trainer-workoutplan.component';

describe('TrainerWorkoutplanComponent', () => {
  let component: TrainerWorkoutplanComponent;
  let fixture: ComponentFixture<TrainerWorkoutplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerWorkoutplanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerWorkoutplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
