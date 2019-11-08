import { Component, OnInit } from '@angular/core';

import { ShoppingListService } from '../../../shared/services/shoppingList.service';
import { Ingredient } from '../../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  name = '';
  amount = 0;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {}

  onAddIngredient(): void {
    if (!this.name || !this.amount) {
      return;
    }

    const newIngredient = new Ingredient(this.name, this.amount);

    this.shoppingListService.addIngredient(newIngredient);
  }
}
