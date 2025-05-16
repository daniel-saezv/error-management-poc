import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Session } from '../models/session';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  httpClient: HttpClient = inject(HttpClient);
  private _session: BehaviorSubject<Session | null> =
    new BehaviorSubject<Session | null>(null);
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public readonly session: Observable<Session | null> =
    this._session.asObservable();

  public readonly isLoggedIn: Observable<boolean> =
    this._isLoggedIn.asObservable();

  login(username: string, password: string):Observable<Session | null> {
    return this.httpClient
      .post<Session>(`${environment.apiUrl}/login`, { username, password })
      .pipe(
        tap((response) => {
          this._session.next(response);
          this._isLoggedIn.next(true);
        }),
        catchError((error) => {
          console.error('Error during login:', error);
          this._session.next(null);
          this._isLoggedIn.next(false);
          return this._session;
        })
      );
  }
}
