import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, Subject } from 'rxjs';
import { finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ICharacter } from 'src/app/models/i-character';
import { IFilm } from 'src/app/models/i-films';
import { CharactersService } from 'src/app/services/characters.service';
import { FilmsService } from 'src/app/services/films.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  public loading = true;
  public characterData: ICharacter;
  public films: {title: string; id: string;}[];
  private characterId: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService,
    private filmsService: FilmsService
  ) { }

  ngOnInit() {
    this.characterId = this.route.snapshot.paramMap.get('id');

    this.charactersService.getCharacterById(this.characterId)
    .pipe(
      tap(data => this.characterData = data),
      switchMap((res: ICharacter) => {
        let films$ = this.createFilmsObserversList(res);
        return forkJoin(films$);
      }),
      // tap(data => {
      //   this.films = data.map(film => {
      //     return {
      //       title: film.title,
      //       id: Utils.getIdFromURL(film.url)
      //     };
      //   })
      // }),
      map(data => {
        return data.map(film => {
          return {
            title: film.title,
            id: Utils.getIdFromURL(film.url)
          };
        })
      }),
      takeUntil(this.destroy$),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        this.films = data;
      },
      error: error => {
        // error
      }
    });
  }

  private createFilmsObserversList(res: ICharacter): Observable<IFilm>[] {
    return res.films.map(film => {
      const filmId = Utils.getIdFromURL(film);
      return this.filmsService.getIFilmById(filmId);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}