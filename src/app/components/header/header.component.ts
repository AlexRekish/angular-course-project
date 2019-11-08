import { Component, Output, EventEmitter } from '@angular/core';

import { SelectedRoute } from './../../shared/enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  collapsed = true;
  SelectedRoute = SelectedRoute;

  @Output() routeSelected = new EventEmitter<SelectedRoute>();

  onSelectRoute(route: SelectedRoute): void {
    this.routeSelected.emit(route);
  }
}
