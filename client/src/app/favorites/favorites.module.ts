import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FavoritesComponent } from './my-favorites/my-favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesTableComponent } from './favorites-table/favorites-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { FavoriteProductDetailComponent } from './favorite-product-detail/favorite-product-detail.component';

@NgModule({
  declarations: [FavoritesComponent, FavoritesTableComponent, FavoriteProductDetailComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    FavoritesRoutingModule,
    ReactiveFormsModule,
  ],
})
export class FavoritesModule {}
