import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavigationComponent
  ],
  exports: [
    FooterComponent,
    NavigationComponent,
    AppRoutingModule
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class LayoutComponentsModule { }
