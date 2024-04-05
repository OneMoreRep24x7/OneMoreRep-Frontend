import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerRegisterComponent } from './trainer-register.component';

describe('TrainerRegisterComponent', () => {
  let component: TrainerRegisterComponent;
  let fixture: ComponentFixture<TrainerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
