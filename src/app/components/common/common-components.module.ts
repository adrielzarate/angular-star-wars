import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { LoadingComponent } from './loading/loading.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    CardComponent,
    LoadingComponent,
    PaginationComponent,
    SearchComponent
  ],
  exports: [
    CardComponent,
    LoadingComponent,
    PaginationComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CommonComponentsModule { }
