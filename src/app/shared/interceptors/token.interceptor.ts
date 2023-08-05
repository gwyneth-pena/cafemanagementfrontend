import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string|null = localStorage.getItem("token");

    if(token){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
     });
    }

    return next.handle(request).pipe(
      catchError((err)=>{
        if (err instanceof HttpErrorResponse) {
       	 if (err.status === 401 || err.status === 403) {
          this.router.navigate(["/"]);
          localStorage.clear();
     	  }}

        throw err;
      })
    );
  }
}
