import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { LoadingComponent } from './loading/loading.component';
import { ModalComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    CardComponent,
    LoadingComponent,
    ModalComponent,
    PaginationComponent,
    SearchComponent
  ],
  exports: [
    CardComponent,
    LoadingComponent,
    ModalComponent,
    PaginationComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommonComponentsModule { }
