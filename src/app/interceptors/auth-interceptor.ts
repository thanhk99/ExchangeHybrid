import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Auth } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private tokenService: TokenService,
    private authService: Auth
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Thêm access token và ngrok header vào request
    const accessToken = this.tokenService.getAccessToken();
    request = this.addHeadersToRequest(request, accessToken);

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 403: // Unauthorized (Token hết hạn/không hợp lệ)
              return this.handleUnauthorizedError(request, next);
            default:
              return throwError(() => error);
          }
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
        catchError((error) => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => error);
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