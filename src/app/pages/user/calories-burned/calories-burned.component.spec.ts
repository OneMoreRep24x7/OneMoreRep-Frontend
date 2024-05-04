import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesBurnedComponent } from './calories-burned.component';

describe('CaloriesBurnedComponent', () => {
  let component: CaloriesBurnedComponent;
  let fixture: ComponentFixture<CaloriesBurnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaloriesBurnedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaloriesBurnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
