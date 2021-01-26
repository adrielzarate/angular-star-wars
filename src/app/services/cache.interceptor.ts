import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { LoadingService } from "../components/common/loading/loading.service";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  private cache = new Map<string, any>();

  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse = this.cache.get(request.url);

    if (cachedResponse) {
      this.loadingService.updateDataLoading(false);
      return of(cachedResponse);
    }

    return next.handle(request).pipe( tap(
      event => {
        this.loadingService.updateDataLoading(true);
        if (event instanceof HttpResponse) {
          this.cache.set(request.url, event);
        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.router.navigate(['not-found']);
        }
      }));

  }
}
