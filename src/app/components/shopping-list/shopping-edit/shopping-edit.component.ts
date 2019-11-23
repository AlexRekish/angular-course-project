import { Component, OnInit, OnDestroy } from '@angular/core';

import { ShoppingListService } from '../../../shared/services/shoppingList.service';
import { Ingredient } from '../../../shared/ingredient.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  name = '';
  amount = 0;
  subscription: Subscription;
  isEditMode = false;
  editedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((i: number) => {
      const { name, amount } = this.shoppingListService.getIngredient(i);

      this.isEditMode = true;
      this.editedItemIndex = i;
      this.name = name;
      this.amount = amount;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClear(form: NgForm): void {
    this.isEditMode = false;
    form.reset();
  }

  onSubmit(form: NgForm): void {
    if (!this.name || !this.amount) {
      return;
    }

    const newIngredient = new Ingredient(this.name, this.amount);

    if (this.isEditMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.onClear(form);
  }

  onDeleteItem(form: NgForm): void {
    if (!this.editedItemIndex) {
      return;
    }

    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear(form);
  }
}
