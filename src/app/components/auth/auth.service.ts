import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

enum AuthError {
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
  TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER',
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  USER_DISABLED = 'USER_DISABLED',
}

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (!err.error || !err.error.error) {
      return throwError(errorMessage);
    }

    switch (err.error.error.message) {
      case AuthError.EMAIL_EXISTS:
        errorMessage = 'The email address is already in use by another account';
        break;

      case AuthError.OPERATION_NOT_ALLOWED:
        errorMessage = 'Password sign-in is disabled for this project';
        break;

      case AuthError.TOO_MANY_ATTEMPTS_TRY_LATER:
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;

      case AuthError.EMAIL_NOT_FOUND:
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;

      case AuthError.INVALID_PASSWORD:
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;

      case AuthError.USER_DISABLED:
        errorMessage = 'The user account has been disabled by an administrator.';
        break;
    }

    return throwError(errorMessage);
  }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWFpVSjybl5hMJYmBvGwy4YuO5DYKIxdU',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWFpVSjybl5hMJYmBvGwy4YuO5DYKIxdU',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }
}
