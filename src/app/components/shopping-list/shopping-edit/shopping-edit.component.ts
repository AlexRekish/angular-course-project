import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from './../../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  name = '';
  amount = 0;

  constructor() {}

  ngOnInit() {}

  onAddIngredient(): void {
    if (!this.name || !this.amount) {
      return;
    }

    const newIngredient = new Ingredient(this.name, this.amount);

    this.ingredientAdded.emit(newIngredient);
  }
}
