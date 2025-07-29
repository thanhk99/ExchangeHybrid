import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpContextToken
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Auth } from '../services/auth.service';
import { TokenService } from '../services/token.service';

export const BYPASS_REFRESH_TOKEN = new HttpContextToken<boolean>(() => false);
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  BYPASS_REFRESH_TOKEN = new HttpContextToken<boolean>(() => false);

  constructor(
    private tokenService: TokenService,
    private authService: Auth
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Thêm access token và ngrok header vào request
    const accessToken = this.tokenService.getAccessToken();
    request = this.addHeadersToRequest(request, accessToken);

    if (request.context.get(BYPASS_REFRESH_TOKEN) === true) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 403 && !request.url.includes('api/v1/auth/refresh') ) {
          return this.handleUnauthorizedError(request, next); 
        }
        return throwError(() => error);
      })
    );
  }

  private addHeadersToRequest(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
    const headers: { [name: string]: string | string[] } = {
      'ngrok-skip-browser-warning': 'true'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return request.clone({
      setHeaders: headers
    });
  }

  private handleUnauthorizedError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((tokens: any) => {
          this.isRefreshing = false;
          this.tokenService.setTokens(tokens.accessToken, tokens.refreshToken);
          this.refreshTokenSubject.next(tokens.accessToken);
          return next.handle(this.addHeadersToRequest(request, tokens.accessToken));
        }),
        catchError((refreshError) => {
          console.error('Refresh token failed. Logging out...', refreshError);
          this.authService.revokeService();
          return throwError(() => refreshError);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          return next.handle(this.addHeadersToRequest(request, token));
        })
      );
    }
  }
}