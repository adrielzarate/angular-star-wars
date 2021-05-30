import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharacter, ICharacters } from '../models/i-character';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private readonly CHARACTERS_API_URL = Utils.SW_API_URL + '/people/';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getCharacters(): Observable<ICharacters> {
    const url = `${this.CHARACTERS_API_URL}`;
    return this.httpClient.get<ICharacters>(url);
  }

  public getCharacterById(characterId: string): Observable<ICharacter> {
    const url = `${this.CHARACTERS_API_URL}${characterId}`;
    return this.httpClient.get<ICharacter>(url);
  }

  public searchCharactersByName(characterName: string = ''): Observable<ICharacters> {
    const url = `${this.CHARACTERS_API_URL}?search=${characterName}`;
    return this.httpClient.get<ICharacters>(url);
  }

  public getCharactersByPage(pageNumber: number): Observable<ICharacters> {
    const url = `${this.CHARACTERS_API_URL}?page=${pageNumber}`;
    return this.httpClient.get<ICharacters>(url);
  }
}
