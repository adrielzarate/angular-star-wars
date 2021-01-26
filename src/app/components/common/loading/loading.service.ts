import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private dataLoading = new Subject<boolean>();

  public isDataLoading$ = this.dataLoading.asObservable();

  updateDataLoading(isLoading: boolean) {
    this.dataLoading.next(isLoading);
  }

}
