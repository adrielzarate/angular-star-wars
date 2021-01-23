import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonComponentsModule } from 'src/app/components/common/common-components.module';
import { CharacterComponent } from '../character/character.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';

@NgModule({
  declarations: [
    CharactersComponent,
    CharacterComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    CommonComponentsModule
  ]
})
export class CharactersModule { }
