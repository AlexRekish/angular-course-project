import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Recipe } from './../recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      const recipeId = +params.get('id');
      this.recipe = this.recipeService.getRecipeById(recipeId);
    });
  }

  onAddIngredients() {
    const { ingredients } = this.recipe;
    this.recipeService.addIngredientsToShoppingList(ingredients);
  }
}
