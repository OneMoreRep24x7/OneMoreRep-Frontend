import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipevariantComponent } from './recipevariant.component';

describe('RecipevariantComponent', () => {
  let component: RecipevariantComponent;
  let fixture: ComponentFixture<RecipevariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipevariantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipevariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
