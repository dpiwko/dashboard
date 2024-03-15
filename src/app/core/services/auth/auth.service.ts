import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { ICredentials, ISession } from '../../models/auth';
import { IUser } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated: boolean = false;
  private _session: BehaviorSubject<ISession> = new BehaviorSubject<ISession>(
    {} as ISession
  );

  private _authenticationState = this._session.pipe(
    map((session) => session && !!session.token),
    tap((state) => (this._isAuthenticated = Boolean(state)))
  );

  constructor() {}

  // TODO: Implement login method with HttpClient and API call
  login(credentials: ICredentials): Observable<boolean> {
    const isValidCredentials =
      credentials.username === 'user' && credentials.password === 'password';

    if (isValidCredentials) {
      // successful login
      const user: IUser = {
        id: 1,
        username: 'user',
        email: 'test@test.com',
        name: 'Test User',
      };
      const session: ISession = { user, token: 'TOKEN' };

      this._session.next(session);

      return of(true).pipe(delay(1000));
    } else {
      // failed login
      return of(false).pipe(delay(1000));
    }
  }

  logout() {
    this._session.next({} as ISession);
  }

  isAuthenticatedUser() {
    return this._authenticationState;
  }

  getCurrentUser() {
    return this._session.pipe(
      map((session) => {
        if (!session) {
          throw new Error('User not authenticated');
        }

        return session.user;
      })
    );
  }

  getToken() {
    return this._session.pipe(
      map((session) => {
        if (!session) {
          throw new Error('User not authenticated');
        }

        return session.token;
      })
    );
  }
}
