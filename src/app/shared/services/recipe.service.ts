import { Injectable } from '@angular/core';

import { ShoppingListService } from './shoppingList.service';
import { Recipe } from '../../components/recipes/recipe.model';
import { Ingredient } from '../ingredient.model';

@Injectable()
export class RecipeService {
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

  getRecipes() {
    return [...this.recipes];
  }

  getRecipeById(id: number): Recipe {
    const recipe = this.recipes.find((item: Recipe): boolean => item.id === id);
    return recipe;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
