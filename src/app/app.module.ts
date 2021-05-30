import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonComponentsModule } from './components/common/common-components.module';
import { LayoutComponentsModule } from './components/layout/layout-components.module';
import { PlanetsComponent } from './pages/planets/planets.component';
import { CacheInterceptor } from './services/cache.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    PlanetsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LayoutComponentsModule,
    CommonComponentsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CacheInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
