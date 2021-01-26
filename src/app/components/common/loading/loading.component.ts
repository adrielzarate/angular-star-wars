import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  public isLoading$: Observable<boolean>;

  constructor(
    public loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.isLoading$ = this.loadingService.isDataLoading$;
  }

}
