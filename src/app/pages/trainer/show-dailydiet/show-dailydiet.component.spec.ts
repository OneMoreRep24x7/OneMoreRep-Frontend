import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDailydietComponent } from './show-dailydiet.component';

describe('ShowDailydietComponent', () => {
  let component: ShowDailydietComponent;
  let fixture: ComponentFixture<ShowDailydietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowDailydietComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowDailydietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
