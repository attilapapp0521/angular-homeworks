import { Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from './models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = `${environment.baseUrl}/auth`;
  private readonly CURRENT_USER_KEY = `currentUser`;

  private readonly _currentUser = signal<User | undefined>(undefined);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {
    const storedUser = localStorage.getItem(this.CURRENT_USER_KEY);

    if (storedUser) {
      this._currentUser.set(JSON.parse(storedUser));
    }

    this.sessionInfo()
      .pipe(
        filter((isLoggedIn) => !isLoggedIn),
        tap(() => {
          this.clearStoredUser();
          this._currentUser.set(undefined);
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  get currentUser() {
    return this._currentUser.asReadonly();
  }

  get isLoggedIn() {
    return this._currentUser() !== undefined;
  }

  login(email: string, password: string) {
    if (environment.mockAuthEnabled) {
      const user = this.getMockUser();

      if (!user?.email || user.password !== password) {
        this.showToast('Hibás e-mail vagy jelszó.');
        return throwError(() => new Error('Hibás belépési adatok'));
      }

      const mockUser: User = {
        email,
        id: 'mock_' + crypto.randomUUID(),
        username: 'Mock_User',
      };
      this._currentUser.set(mockUser);
      this.storeUser(mockUser);
      this.showToast('Sikeres mock bejelentkezés!');
      return of(mockUser);
    }

    return this.http
      .post<User>(`${this.BASE_URL}/login`, { email, password })
      .pipe(
        tap((user) => {
          this._currentUser.set(user);
          this.storeUser(user);
        })
      );
  }

  logout() {
    if (environment.mockAuthEnabled) {
      this.clearStoredUser();
      this._currentUser.set(undefined);
      this.router.navigate(['/login']);
    }

    return this.http.post(`${this.BASE_URL}/logout`, null).pipe(
      tap(() => {
        this.clearStoredUser();
        this._currentUser.set(undefined);
        this.router.navigate(['/login']);
      })
    );
  }

  sessionInfo() {
    return this.http
      .get<{ isLoggedIn: boolean }>(`${this.BASE_URL}/sessionInfo`)
      .pipe(map((res) => res.isLoggedIn));
  }

  registration(email: string, password: string) {
    if (environment.mockAuthEnabled) {
      const user = this.getMockUser();
      if (user) {
        this.showToast('Ez az e-mail már regisztrálva van.');
        return throwError(() => new Error('Felhasználó már létezik'));
      }

      this.storeMockUser(email, password );

      const mockUser: User = {
        email,
        id: 'mock_' + crypto.randomUUID(),
        username: `mockUser_${email}`,
      };
      this._currentUser.set(mockUser);
      this.storeUser(mockUser);
      this.showToast('Mock regisztráció sikeres!');
      return of(mockUser);
    }

    return this.http
      .post<User>(`${this.BASE_URL}/registration`, {
        email,
        password,
      })
      .pipe(
        tap(() => this.showToast('Sikeres regisztráció!')),
        catchError((err) => {
          this.showToast('Regisztráció sikertelen.');
          throw err;
        })
      );
  }

  private storeUser(user: User) {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  private clearStoredUser() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  private storeMockUser(email: string, password: string) {
      localStorage.setItem(`mockUser_${email}`, JSON.stringify({ email, password }));
  }

  private getMockUser(): {email: string, password: string } | null   {
    const email = this.currentUser()?.email;
    if(email) {
      const stored = localStorage.getItem(`mockUser_${email}`);
      return stored ? JSON.parse(stored) as {email: string, password: string} : null;
    }

    return null;
  }

  //Igen, ez valójában ez UI feladat és nem itt lenne a helye, csak szemléltetés.
  private showToast(message: string) {
    this.snackBar.open(message, 'Bezár', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
