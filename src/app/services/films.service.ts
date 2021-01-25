import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IFilm, IFilms } from '../models/i-films';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  /**
   * ???
   */
  private readonly filmsApiURL = Utils.swApiURL + '/films';

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * ???
   *
   */
  public getIFilms(): Observable<IFilms> {
    const url = `${this.filmsApiURL}`;
    return this.httpClient.get<IFilms>(url);
  }

  /**
   * ???
   *
   * @param filmId
   */
  public getIFilmById(filmId: number): Observable<IFilm> {
    const url = `${this.filmsApiURL}/${filmId}`;
    return this.httpClient.get<IFilm>(url);
  }

  /**
   * ???
   *
   * @param filmTitle
   */
  public searchIFilmsByName(filmTitle: string = ''): Observable<IFilms> {
    const url = `${this.filmsApiURL}/?search=${filmTitle}`;
    return this.httpClient.get<IFilms>(url);
  }

  /**
   * ???
   *
   * @param filmNumber
   */
  public getIFilmsByPage(filmNumber: number): Observable<IFilms> {
    const url = `${this.filmsApiURL}/?page=${filmNumber}`;
    return this.httpClient.get<IFilms>(url);
  }
}
