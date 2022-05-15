import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { Effects, reducers } from './+store';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { SharedModule } from './shared/shared.module';
import { ProductsEffects } from './+store/products/effects';
import { ProductService } from './products/product.service';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    ProductItemComponent,
    ProductsListComponent,
    ProductDetailComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(Effects),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
