import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharacter, ICharacters } from '../models/i-character';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  /**
   * ???
   */
  private readonly charactersApiURL = Utils.swApiURL + '/people/';

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * ???
   *
   */
  public getCharacters(): Observable<ICharacters> {
    const url = `${this.charactersApiURL}`;
    return this.httpClient.get<ICharacters>(url);
  }

  /**
   * ???
   *
   * @param characterId
   */
  public getCharacterById(characterId: string): Observable<ICharacter> {
    const url = `${this.charactersApiURL}${characterId}`;
    return this.httpClient.get<ICharacter>(url);
  }

  /**
   * ???
   *
   * @param characterName
   */
  public searchCharactersByName(characterName: string = ''): Observable<ICharacters> {
    const url = `${this.charactersApiURL}?search=${characterName}`;
    return this.httpClient.get<ICharacters>(url);
  }

  /**
   * ???
   *
   * @param pageNumber
   */
  public getCharactersByPage(pageNumber: number): Observable<ICharacters> {
    const url = `${this.charactersApiURL}?page=${pageNumber}`;
    return this.httpClient.get<ICharacters>(url);
  }

  /**
   * ???
   *
   * @param pageNumber
   */
  public getCharactersByPageHEAD(pageNumber: number): Observable<ICharacters> {
    const url = `${this.charactersApiURL}?page=${pageNumber}`;
    return this.httpClient.head<ICharacters>(url);
  }

}
