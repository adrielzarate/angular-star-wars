import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnChanges {

  @Output() onSelectPage = new EventEmitter<number>();
  @Input() previous: string = null;
  @Input() next: string = null;
  @Input() pagesLength: number = 0;
  public pagesList: string[] = [];
  public currentPage: string = '1';

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pagesLength) {
      this.pagesList = this.createPagesList(changes.pagesLength.currentValue);
    }
  }

  private createPagesList(pagesLength: number): string[] {
    let list = []
    for (let i = 0; i < pagesLength; i++) {
      list.push(`${i + 1}`);
    }
    return list;
  }

  public updatePage(url: string) {
    const pageId = Utils.getIdFromURL(url);
    this.currentPage = `${pageId}`;
    this.onSelectPage.emit(pageId);
  }
}
