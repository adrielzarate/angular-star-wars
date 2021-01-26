import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IFilm, IFilms } from '../models/i-films';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private readonly FILMS_API_URL = Utils.SW_API_URL + '/films';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getFilms(): Observable<IFilms> {
    const url = `${this.FILMS_API_URL}`;
    return this.httpClient.get<IFilms>(url);
  }

  public getFilmById(filmId: string): Observable<IFilm> {
    const url = `${this.FILMS_API_URL}/${filmId}`;
    return this.httpClient.get<IFilm>(url);
  }
}
