import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailyworkoutComponent } from './add-dailyworkout.component';

describe('AddDailyworkoutComponent', () => {
  let component: AddDailyworkoutComponent;
  let fixture: ComponentFixture<AddDailyworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDailyworkoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDailyworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
