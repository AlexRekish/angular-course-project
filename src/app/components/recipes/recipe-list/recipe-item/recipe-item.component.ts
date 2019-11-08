import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from './../../recipe.model';
import { RecipeService } from '../../../../shared/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {
  @Input() item: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {}

  onSelectRecipe() {
    this.recipeService.recipeSelected.emit(this.item);
  }
}
