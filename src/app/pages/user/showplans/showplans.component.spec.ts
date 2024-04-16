import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowplansComponent } from './showplans.component';

describe('ShowplansComponent', () => {
  let component: ShowplansComponent;
  let fixture: ComponentFixture<ShowplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowplansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
