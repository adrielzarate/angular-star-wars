import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonComponentsModule } from 'src/app/components/common/common-components.module';
import { FilmComponent } from '../film/film.component';
import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from './films.component';



@NgModule({
  declarations: [
    FilmsComponent,
    FilmComponent
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    CommonComponentsModule
  ]
})
export class FilmsModule { }
