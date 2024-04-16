import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtrainerComponent } from './viewtrainer.component';

describe('ViewtrainerComponent', () => {
  let component: ViewtrainerComponent;
  let fixture: ComponentFixture<ViewtrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewtrainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewtrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
