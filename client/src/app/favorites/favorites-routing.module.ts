import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './my-favorites/my-favorites.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FavoritesComponent,
  },
];

export const FavoritesRoutingModule = RouterModule.forChild(routes);
