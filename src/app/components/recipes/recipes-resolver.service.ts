import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();

    if (recipes) {
      return recipes;
    }

    return this.dataStorageService.fetchRecipes();
  }
}
