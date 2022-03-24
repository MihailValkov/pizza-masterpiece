import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppInterceptorProvider } from './app.interceptor';

@NgModule({
  declarations: [FooterComponent, NavigationComponent, AsideNavComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  providers: [AppInterceptorProvider],
  exports: [AsideNavComponent],
})
export class CoreModule {}
