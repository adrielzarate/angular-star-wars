import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/components/common/loading/loading.service';
import { FilmsService } from 'src/app/services/films.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  public filmId: string;
  public imageURL: string;
  public filmData$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmsService: FilmsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.getFilmById();
    this.router.events.subscribe(event => {
      this.getFilmById();
    });
  }

  public getFilmById() {
    this.filmId = this.route.snapshot.paramMap.get('id');
    this.filmData$ = this.filmsService.getFilmById(this.filmId).pipe(
      tap(filmData => {
        this.imageURL = Utils.createImageURL(filmData.title, 'films');
      }),
      finalize(() => {
        this.loadingService.updateDataLoading(false);
      })
    );
  }

}
