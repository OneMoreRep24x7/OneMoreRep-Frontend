import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutComponent } from './workout/workout.component';
import { ViewworkoutComponent } from './viewworkout/viewworkout.component';
import { AddworkoutComponent } from './addworkout/addworkout.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipevariantComponent } from './recipevariant/recipevariant.component';
import { AddrecipeComponent } from './addFood/addrecipe.component';
import { AddvariantComponent } from './addvariant/addvariant.component';
import { ViewfoodComponent } from './viewfood/viewfood.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';

const routes: Routes = [
{path:'',component:AdmindashboardComponent},
{path:'workout',component:WorkoutComponent},
{path:'viewWorkout',component:ViewworkoutComponent},
{path:'addWorkout',component:AddworkoutComponent},
{path:'recipe',component:RecipeComponent},
{path:'recipeVariant',component:RecipevariantComponent},
{path:'addRecipe',component:AddrecipeComponent},
{path:'addFoodVariant',component:AddvariantComponent},
{path:'viewFood/:id',component:ViewfoodComponent},
    

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
