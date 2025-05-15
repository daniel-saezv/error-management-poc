import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  login(username: string, password: string) {
    return this.httpClient
      .post<Session>(`${environment.apiUrl}/login`, { username, password })
      .subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this._session.next(response);
          this._isLoggedIn.next(true);
        },
        error: (error) => {
          console.error('Login failed', error);
          this._isLoggedIn.next(false);
        },
      });
  }
}
