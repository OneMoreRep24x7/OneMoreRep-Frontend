import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDietplansComponent } from './add-dietplans.component';

describe('AddDietplansComponent', () => {
  let component: AddDietplansComponent;
  let fixture: ComponentFixture<AddDietplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDietplansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDietplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
