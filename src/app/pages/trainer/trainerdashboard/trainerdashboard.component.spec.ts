import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerdashboardComponent } from './trainerdashboard.component';

describe('TrainerdashboardComponent', () => {
  let component: TrainerdashboardComponent;
  let fixture: ComponentFixture<TrainerdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerdashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
