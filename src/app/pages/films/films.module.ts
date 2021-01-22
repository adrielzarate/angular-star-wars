import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from './films.component';



@NgModule({
  declarations: [
    FilmsComponent
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule
  ]
})
export class FilmsModule { }
