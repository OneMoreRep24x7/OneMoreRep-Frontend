import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectTrainerComponent } from './connect-trainer.component';

describe('ConnectTrainerComponent', () => {
  let component: ConnectTrainerComponent;
  let fixture: ComponentFixture<ConnectTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectTrainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnectTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
