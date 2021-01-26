import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, map, pluck, switchMap, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/components/common/loading/loading.service';
import { ICharacter } from 'src/app/models/i-character';
import { CharactersService } from 'src/app/services/characters.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersComponent {

  public itemsPerPage: number;
  public previousPage: string;
  public nextPage: string;
  public pagesLength: number = 0;
  public currentPage: number = 1;
  public characters$: Observable<ICharacter[]>;
  public sorted: boolean = false;

  constructor(
    private charactersService: CharactersService,
    private loadingService: LoadingService
  ) { }

  public searchCharacters(characterName:string): void {
    this.characters$ = this.charactersService.searchCharactersByName(characterName)
    .pipe(
      tap( data => {
        this.itemsPerPage = data.results.length;
        this.previousPage = data.previous;
        this.nextPage = data.next;
        this.pagesLength = Utils.getPagesAmount(data.count, data.results.length);
        this.currentPage = Utils.getCurrentPage(this.previousPage, this.nextPage, this.pagesLength);
        }
      ),
      pluck('results'),
      switchMap(valueToSearch => of(valueToSearch)),
      finalize(() => {
        this.loadingService.updateDataLoading(false);
      })
    )
  }

  public updateCharactersPage(pageNumber: number): void {
    this.characters$ = this.charactersService.getCharactersByPage(pageNumber)
    .pipe(
      tap( data => {
        this.previousPage = data.previous;
        this.nextPage = data.next;
        this.currentPage = Utils.getCurrentPage(this.previousPage, this.nextPage, this.pagesLength);
      }),
      pluck('results'),
      switchMap(valueToSearch => of(valueToSearch)),
      finalize(() => {
        this.loadingService.updateDataLoading(false);
      })
    )
  }

  public sortTable(sortProperty: string) {
    this.characters$ = this.characters$.pipe(
      map(characters => {
        return characters.sort((a, b) => {
          if(this.sorted) {
            if(a[sortProperty] < b[sortProperty]) return -1;
            if(a[sortProperty] > b[sortProperty]) return 1;
          } else {
            if(a[sortProperty] < b[sortProperty]) return 1;
            if(a[sortProperty] > b[sortProperty]) return -1;
          }
          return 0;
        });
      })
    )
    this.sorted = !this.sorted;
  }

}
