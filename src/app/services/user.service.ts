import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http : HttpClient
  ) { }
  private cachedUser: User | null = null;
  private user$ = new BehaviorSubject<User | null>(null);

  fetchUser(): Observable<User> {
    if (this.cachedUser) {
      return of(this.cachedUser); 
    }

    return this.http.get<User>(environment.apiGetUser).pipe(
      tap(user => {
        this.cachedUser = user;
        this.user$.next(user);
      })
    );
  }

  getUserStream(): Observable<User | null> {
    return this.user$.asObservable();
  }

  clearCache() {
    this.cachedUser = null;
    this.user$.next(null);
  }


}