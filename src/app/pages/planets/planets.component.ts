import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, pluck, tap } from 'rxjs/operators';
import { IPlanet } from 'src/app/models/i-planet';
import { PlanetsService } from 'src/app/services/planets.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
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
      tap(console.log),
      finalize(() => {
        this.loading = false;
      })
    )
  }

}
