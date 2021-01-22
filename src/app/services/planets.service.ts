import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlanet } from '../models/i-planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  /**
   * ???
   */
  private readonly swDataUrl = 'https://swapi.dev/api';

  constructor(
    private httpClient: HttpClient
  ) { }

    /**
     * ???
     *
     * @param planetId
     */
    public getPlanets(planetId: string = ''): Observable<IPlanet[]> {
      const url = `${this.swDataUrl}/planets/${planetId}`;
      return this.httpClient.get<IPlanet[]>(url);
  }

    /**
     * ???
     *
     * @param planetId
     */
    public searchPlanets(planetId: string = ''): Observable<IPlanet[]> {
      const url = `${this.swDataUrl}/planets/?search${planetId}`;
      return this.httpClient.get<IPlanet[]>(url);
  }
}
