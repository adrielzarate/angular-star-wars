import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';



@NgModule({
  declarations: [
    CharactersComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule
  ]
})
export class CharactersModule { }
