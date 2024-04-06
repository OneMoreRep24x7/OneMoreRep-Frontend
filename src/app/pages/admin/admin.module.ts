import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { WorkoutComponent } from './workout/workout.component';
import { ViewworkoutComponent } from './viewworkout/viewworkout.component';
import { AddworkoutComponent } from './addworkout/addworkout.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipevariantComponent } from './recipevariant/recipevariant.component';
import { AddrecipeComponent } from './addFood/addrecipe.component';
import { AddvariantComponent } from './addvariant/addvariant.component';
import { ViewfoodComponent } from './viewfood/viewfood.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';


@NgModule({
  
  declarations: [
    WorkoutComponent,
    ViewworkoutComponent,
    AddworkoutComponent,
    RecipeComponent,
    RecipevariantComponent,
    AddrecipeComponent,
    AddvariantComponent,
    ViewfoodComponent,
    AdmindashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    
  ]
})
export class AdminModule { }
