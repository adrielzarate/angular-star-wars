import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, pluck, switchMap } from 'rxjs/operators';
import { IPlanet } from 'src/app/models/i-planet';
import { PlanetsService } from 'src/app/services/planets.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsComponent implements OnInit {

  public loading = true;
  public planets$: Observable<IPlanet[]>;

  constructor(
    private planetsService: PlanetsService
  ) {}

  ngOnInit() {
    this.planets$ = this.planetsService.getPlanets()
    .pipe(
      pluck('results'),
      finalize(() => {
        this.loading = false;
      })
    )
  }

  /**
   * ???
   */
  public searchPlanets(planetName:string): void {
    this.loading = true;
    this.planets$ = this.planetsService.searchPlanetsByName(planetName)
    .pipe(
      pluck('results'),
      switchMap(valueToSearch => of(valueToSearch)),
      finalize(() => {
        this.loading = false;
      })
    )
  }

}
