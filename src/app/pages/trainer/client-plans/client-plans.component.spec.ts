import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPlansComponent } from './client-plans.component';

describe('ClientPlansComponent', () => {
  let component: ClientPlansComponent;
  let fixture: ComponentFixture<ClientPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientPlansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
