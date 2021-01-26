import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map, pluck } from 'rxjs/operators';
import { LoadingService } from 'src/app/components/common/loading/loading.service';
import { FilmsService } from 'src/app/services/films.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  public film$: Observable<{title: string; imageURL: string;}[]>;
  public imageURL: string;

  constructor(
    private filmsService: FilmsService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.film$ = this.filmsService.getFilms().pipe(
      pluck('results'),
      map(filmsData => {
        return filmsData.map(film => {
          return {
           title: film.title,
           imageURL: Utils.createImageURL(film.title, 'films')
          };
        });
      }),
      finalize(() => {
        this.loadingService.updateDataLoading(false);
      })
    )
  }

  public setDefaultPic() {
    this.imageURL = Utils.DEFAULT_IMAGE_URL;
  }
}
