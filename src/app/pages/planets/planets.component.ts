import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, map, pluck, switchMap, tap } from 'rxjs/operators';
import { IPlanet } from 'src/app/models/i-planet';
import { PlanetsService } from 'src/app/services/planets.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsComponent implements OnInit {

  public loading = true;
  public previousPage: string;
  public nextPage: string;
  public pagesLength: number = 0;
  public planets$: Observable<IPlanet[]>;

  constructor(
    private planetsService: PlanetsService
  ) {}

  ngOnInit() {}

  /**
   * ???
   */
  public searchPlanets(planetName:string): void {
    this.loading = true;
    this.planets$ = this.planetsService.searchPlanetsByName(planetName)
    .pipe(
      tap( data => {
        this.previousPage = data.previous;
        this.nextPage = data.next;
        this.pagesLength = Utils.getPagesAmount(data.count, data.results.length);
        }
      ),
      pluck('results'),
      map(planetData => {
        return planetData.map(planet => {
          return {
            name: planet.name,
            rotation_period: planet.rotation_period,
            orbital_period: planet.orbital_period,
            diameter: planet.diameter,
            climate: planet.climate,
            gravity: planet.gravity,
            terrain: planet.terrain,
            surface_water: planet.surface_water,
            population: planet.population
          };
        });
      }),
      switchMap(valueToSearch => of(valueToSearch)),
      finalize(() => {
        this.loading = false;
      })
    )
  }

  /**
   * ???
   */
  public updatePlantesPage(pageNumber: number): void {
    this.loading = true;
    this.planets$ = this.planetsService.getPlanetsByPage(pageNumber)
    .pipe(
      tap( data => {
        this.previousPage = data.previous;
        this.nextPage = data.next;
      }),
      pluck('results'),
      map(planetData => {
        return planetData.map(planet => {
          return {
            name: planet.name,
            rotation_period: planet.rotation_period,
            orbital_period: planet.orbital_period,
            diameter: planet.diameter,
            climate: planet.climate,
            gravity: planet.gravity,
            terrain: planet.terrain,
            surface_water: planet.surface_water,
            population: planet.population
          };
        });
      }),
      switchMap(valueToSearch => of(valueToSearch)),
      finalize(() => {
        this.loading = false;
      })
    )
  }

}
