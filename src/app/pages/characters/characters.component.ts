import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, pluck, switchMap, tap } from 'rxjs/operators';
import { ICharacter } from 'src/app/models/i-character';
import { CharactersService } from 'src/app/services/characters.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersComponent implements OnInit {

  public loading: boolean = true;
  public previousPage: string;
  public nextPage: string;
  public pagesLength: number = 0;
  public currentPage: number = 1;
  public characters$: Observable<ICharacter[]>;

  constructor(
    private charactersService: CharactersService
  ) { }

  ngOnInit() {}

  /**
   * ???
   */
  public searchCharacters(characterName:string): void {
    this.loading = true;
    this.characters$ = this.charactersService.searchCharactersByName(characterName)
    .pipe(
      tap( data => {
        this.previousPage = data.previous;
        this.nextPage = data.next;
        this.pagesLength = Utils.getPagesAmount(data.count, data.results.length);
        this.currentPage = Utils.getCurrentPage(this.previousPage, this.nextPage, this.pagesLength);
        console.log('this.currentPage', this.currentPage);
        }
      ),
      pluck('results'),
      switchMap(valueToSearch => of(valueToSearch)),
      finalize(() => {
        this.loading = false;
      })
    )
  }

  /**
   * ???
   */
  public updateCharactersPage(pageNumber: number): void {
    this.loading = true;
    this.characters$ = this.charactersService.getCharactersByPage(pageNumber)
    .pipe(
      tap( data => {
        this.previousPage = data.previous;
        this.nextPage = data.next;
        this.currentPage = Utils.getCurrentPage(this.previousPage, this.nextPage, this.pagesLength);
        console.log('this.currentPage', this.currentPage);
      }),
      pluck('results'),
      switchMap(valueToSearch => of(valueToSearch)),
      finalize(() => {
        this.loading = false;
      })
    )
  }

  /**
   * ???
   */
  // public getPagesAmount(index: number): void {
  //   this.charactersService.getCharactersByPageHEAD(index).subscribe({
  //     next: _data => {
  //       this.getPagesAmount(index + 1);
  //     },
  //     error: error => {
  //       this.pagesLength = index;
  //       this.pagesLengthReady = true;
  //     }
  //   })
  // }
}
