import { Component } from '@angular/core';

import { SelectedRoute } from './shared/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'course-project';
  selectedRoute: SelectedRoute = SelectedRoute.Recipes;
  SelectedRoute = SelectedRoute;

  onRouteSelected(route: SelectedRoute): void {
    this.selectedRoute = route;
  }
}
