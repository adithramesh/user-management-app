import { inject } from '@angular/core';
import * as AuthActions from './actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, map, switchMap, tap } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload, User } from '../../app.state';

export class Autheffects {
  actions$ = inject(Actions);
  router = inject(Router);
  authService = inject(AuthService);

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register), // Listen for the register action
      switchMap(
        (
          action // Get the action which contains the user data
        ) =>
          this.authService.register(action.user).pipe(
            // Call the register method with user data
            map((response) => {
              // Assuming the response contains a message
              return AuthActions.registerSuccess({ message: response.message }); // Only return the message
            }),
            catchError((error) => {
              // Handle error and return the failure action
              return of(
                AuthActions.registerFailure({
                  error: error.error.message || 'Registration failed',
                })
              );
            })
          )
      )
    );
  });

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerFailure),
        tap(({ error }) => {
          console.error('Registration failed:', error);
          // Additional error handling actions, like logging or analytics
          this.router.navigate(['/register'], { queryParams: { error } }); // Redirect to register page with error message
        })
      ),
    { dispatch: false }
  );

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login), // Listen for the login action
      switchMap(
        (
          action // Get the action which contains the user data
        ) =>
          this.authService.login(action.user).pipe(
            // Call the login method with user data
            map((response) => {
              // Assuming the response contains a message, token, and user
              return AuthActions.loginSuccess({
                message: response.message,
                token: response.token,
                user: response.user,
              });
            }),
            catchError((error) => {
              // Handle error and return the failure action
              return of(
                AuthActions.loginFailure({
                  error: error.error.message || 'Login failed',
                })
              );
            })
          )
      )
    );
  });



  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          localStorage.setItem('token', action.token);
          const token = action.token; // Token from the login success action
          // const decodedToken:User = jwtDecode(token);
          const user = action.user;
          console.log("role from user passed",user);
          if (user?.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
          // this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerFailure),
        tap(({ error }) => {
          console.error('Login failed:', error);
          // Additional error handling actions, like logging or analytics
          this.router.navigate(['/login'], { queryParams: { error } }); // Redirect to register page with error message
        })
      ),
    { dispatch: false }
  );
}
