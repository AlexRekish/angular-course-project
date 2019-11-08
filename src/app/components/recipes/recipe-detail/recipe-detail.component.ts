import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from './../recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {}

  onAddIngredients() {
    const { ingredients } = this.selectedRecipe;
    this.recipeService.addIngredientsToShoppingList(ingredients);
  }
}
