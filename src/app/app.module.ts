import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonComponentsModule } from './components/common/common-components.module';
import { LayoutComponentsModule } from './components/layout/layout-components.module';
import { PlanetsComponent } from './pages/planets/planets.component';
import { CacheInterceptor } from './services/cache.interceptor';
import { IdComponent } from './pages/id/id.component';
import { HomeComponent } from './pages/home/home.component';
import { InnerComponent } from './pages/inner/inner.component';
import { ChildComponent } from './pages/home/child/child.component';

@NgModule({
  declarations: [
    AppComponent,
    PlanetsComponent,
    IdComponent,
    HomeComponent,
    InnerComponent,
    ChildComponent,
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
