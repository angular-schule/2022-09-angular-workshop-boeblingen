import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { BookEffects } from './app/books/store/book.effects';
import { bookFeature } from './app/books/store/book.reducer';

import { provideRouterStore, routerReducer } from '@ngrx/router-store';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes /*, withDebugTracing() */),
    provideHttpClient(),

    provideStore({
      router: routerReducer
    }),
    provideEffects(),
    provideStoreDevtools({ maxAge:25, logOnly: !isDevMode }),
    provideState(bookFeature),
    provideEffects(BookEffects),

    // TODO: CustomRouteSerializer
    provideRouterStore()
  ]
};
