import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWorkoutsComponent } from './show-workouts.component';

describe('ShowWorkoutsComponent', () => {
  let component: ShowWorkoutsComponent;
  let fixture: ComponentFixture<ShowWorkoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowWorkoutsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
