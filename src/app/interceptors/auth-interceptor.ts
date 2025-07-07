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
    // Thêm access token vào header nếu có
    const accessToken = this.tokenService.getAccessToken();
    if (accessToken) {
      request = this.addTokenToRequest(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401: // Unauthorized (Token hết hạn/không hợp lệ)
              return this.handleUnauthorizedError(request, next);
            case 403: // Forbidden (Không có quyền)
              return this.handleForbiddenError(error);
            default:
              return throwError(() => error);
          }
        }
        return throwError(() => error);
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
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
          return next.handle(this.addTokenToRequest(request, tokens.accessToken));
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
          return next.handle(this.addTokenToRequest(request, token));
        })
      );
    }
  }

  private handleForbiddenError(error: HttpErrorResponse): Observable<never> {
    // Hiển thị thông báo không có quyền truy cập
    return throwError(() => error);
  }
}