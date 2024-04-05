import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserprofileComponent } from './adduserprofile.component';

describe('AdduserprofileComponent', () => {
  let component: AdduserprofileComponent;
  let fixture: ComponentFixture<AdduserprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdduserprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdduserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
