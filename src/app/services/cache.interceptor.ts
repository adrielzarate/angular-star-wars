import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  private cache = new Map<string, any>();

  constructor(
    private router: Router,
    // private headerService: HeaderService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // this.headerService.titleReady.emit(false);

    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse = this.cache.get(request.url);

    if (cachedResponse) {
      // this.headerService.titleReady.emit(true);
      return of(cachedResponse);
    }

    return next.handle(request).pipe( tap(
      event => {
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
