import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlanet, IPlanets } from '../models/i-planet';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  /**
   * ???
   */
  private readonly planetsApiURL = Utils.swApiURL + '/planets';

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * ???
   *
   */
  public getPlanets(): Observable<IPlanets> {
    const url = `${this.planetsApiURL}`;
    return this.httpClient.get<IPlanets>(url);
  }

  /**
   * ???
   *
   * @param planetId
   */
  public getPlanetById(planetId: string): Observable<IPlanet> {
    const url = `${this.planetsApiURL}/${planetId}`;
    return this.httpClient.get<IPlanet>(url);
  }

  /**
   * ???
   *
   * @param planetName
   */
  public searchPlanetsByName(planetName: string = ''): Observable<IPlanets> {
    const url = `${this.planetsApiURL}/?search=${planetName}`;
    return this.httpClient.get<IPlanets>(url);
  }

  /**
   * ???
   *
   * @param pageNumber
   */
  public getPlanetsByPage(pageNumber: number): Observable<IPlanets> {
    const url = `${this.planetsApiURL}/?page=${pageNumber}`;
    return this.httpClient.get<IPlanets>(url);
  }
}
