import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlanet, IPlanets } from '../models/i-planet';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private readonly PLANETS_API_URL = Utils.SW_API_URL + '/planets';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getPlanets(): Observable<IPlanets> {
    const url = `${this.PLANETS_API_URL}`;
    return this.httpClient.get<IPlanets>(url);
  }

  public getPlanetById(planetId: string): Observable<IPlanet> {
    const url = `${this.PLANETS_API_URL}/${planetId}`;
    return this.httpClient.get<IPlanet>(url);
  }

  public searchPlanetsByName(planetName: string = ''): Observable<IPlanets> {
    const url = `${this.PLANETS_API_URL}/?search=${planetName}`;
    return this.httpClient.get<IPlanets>(url);
  }

  public getPlanetsByPage(pageNumber: number): Observable<IPlanets> {
    const url = `${this.PLANETS_API_URL}/?page=${pageNumber}`;
    return this.httpClient.get<IPlanets>(url);
  }
}
