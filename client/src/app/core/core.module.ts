import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "../material/material.module";
import { AsideNavComponent } from "./aside-nav/aside-nav.component";
import { FooterComponent } from "./footer/footer.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { AppInterceptorProvider } from "./app.interceptor";
import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./auth.service";
import { AdminGuard } from "./guards/admin.guard";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers, Effects } from "./+store";
import { EffectsModule } from "@ngrx/effects";
import { SharedModule } from "../shared/shared.module";
import { NotFoundComponent } from "./not-found/not-found.component";

@NgModule({
  declarations: [FooterComponent, NavigationComponent, AsideNavComponent, NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature("userData", reducers, { metaReducers }),
    EffectsModule.forFeature(Effects),
  ],
  providers: [AppInterceptorProvider, AuthGuard, AdminGuard, AuthService],
  exports: [AsideNavComponent, NotFoundComponent],
})
export class CoreModule {}
