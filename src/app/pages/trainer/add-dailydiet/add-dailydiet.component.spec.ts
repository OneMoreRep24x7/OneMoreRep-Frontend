import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailydietComponent } from './add-dailydiet.component';

describe('AddDailydietComponent', () => {
  let component: AddDailydietComponent;
  let fixture: ComponentFixture<AddDailydietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDailydietComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDailydietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
