import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtrainersComponent } from './showtrainers.component';

describe('ShowtrainersComponent', () => {
  let component: ShowtrainersComponent;
  let fixture: ComponentFixture<ShowtrainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowtrainersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowtrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
