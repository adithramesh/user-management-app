import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { authFeaturKey, authReducer } from './store/auth/reducer';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { Autheffects } from './store/auth/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState(authFeaturKey, authReducer),
    provideStoreDevtools({
      maxAge:25,
      logOnly:!isDevMode(),
      autoPause: true,
      trace:false,
      traceLimit:75,
    }),
    provideHttpClient(),
    provideEffects( Autheffects)
]
};
