import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/components/common/loading/loading.service';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  public filmId: string;
  public filmData$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filmsService: FilmsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.getIFilmById();
    this.router.events.subscribe(event => {
      this.getIFilmById();
    });
  }

  public getIFilmById() {
    this.filmId = this.route.snapshot.paramMap.get('id');
    this.filmData$ = this.filmsService.getIFilmById(this.filmId).pipe(
      finalize(() => {
        this.loadingService.updateDataLoading(false);
      })
    );
  }

}
