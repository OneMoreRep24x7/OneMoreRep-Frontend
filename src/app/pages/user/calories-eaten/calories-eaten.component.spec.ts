import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesEatenComponent } from './calories-eaten.component';

describe('CaloriesEatenComponent', () => {
  let component: CaloriesEatenComponent;
  let fixture: ComponentFixture<CaloriesEatenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaloriesEatenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaloriesEatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
