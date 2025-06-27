import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._authService.getToken();

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Tenta fazer refresh do token
          return this._authService.refreshToken().pipe(
            switchMap(() => {
              const newToken = this._authService.getToken();
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
              return next.handle(retryReq);
            }),
            catchError((err) => {
              this._authService.logout();
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
