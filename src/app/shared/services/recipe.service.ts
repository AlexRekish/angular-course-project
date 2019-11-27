import { Injectable } from '@angular/core';

import { ShoppingListService } from './shoppingList.service';
import { Recipe } from '../../components/recipes/recipe.model';
import { Ingredient } from '../ingredient.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'A test recipe',
      'This is simply a test',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/goulash.jpg',
      [new Ingredient('Meat', 1)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  fireChanges(): void {
    this.recipeChanged.next([...this.recipes]);
  }

  getRecipes() {
    return [...this.recipes];
  }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.fireChanges();
  }

  getRecipeById(id: number): Recipe {
    const recipe = this.recipes.find((item: Recipe): boolean => item.id === id);
    return recipe;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.fireChanges();
  }

  updateRecipe(id: number, recipe: Recipe) {
    const index = this.recipes.findIndex((r: Recipe) => r.id === id);
    this.recipes[index] = recipe;
    this.fireChanges();
  }

  deleteRecipe(id: number) {
    const index = this.recipes.findIndex((r: Recipe) => r.id === id);
    this.recipes.splice(index, 1);
    this.fireChanges();
  }
}
