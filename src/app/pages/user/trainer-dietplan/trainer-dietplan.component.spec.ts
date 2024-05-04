import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerDietplanComponent } from './trainer-dietplan.component';

describe('TrainerDietplanComponent', () => {
  let component: TrainerDietplanComponent;
  let fixture: ComponentFixture<TrainerDietplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerDietplanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerDietplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
