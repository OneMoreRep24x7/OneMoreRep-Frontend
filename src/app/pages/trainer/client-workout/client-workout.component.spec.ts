import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWorkoutComponent } from './client-workout.component';

describe('ClientWorkoutComponent', () => {
  let component: ClientWorkoutComponent;
  let fixture: ComponentFixture<ClientWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientWorkoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
