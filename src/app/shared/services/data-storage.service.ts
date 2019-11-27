import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { map, tap } from 'rxjs/operators';

import { Recipe } from 'src/app/components/recipes/recipe.model';

const recipesUrl = 'https://angular-course-561a4.firebaseio.com/recipes.json';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put<Recipe[]>(recipesUrl, recipes).subscribe(result => {
      console.log('Done!');
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(recipesUrl).pipe(
      map(recipes => recipes.map(recipe => ({ ...recipe, ingredients: recipe.ingredients || [] }))),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
