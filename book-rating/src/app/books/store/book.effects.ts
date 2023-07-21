import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { BookStoreService } from '../book-store.service';
import { BookActions } from './book.actions';
import { Store } from '@ngrx/store';
import { selectBooks, selectLastUpdate } from './book.selectors';


@Injectable()
export class BookEffects implements OnInitEffects {

  store = inject(Store);
  booksStore = inject(BookStoreService);

  /*
  loadBooks$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(BookActions.loadBooks),
      switchMap(() =>
        this.booksStore.getBooks().pipe(
          map(books => BookActions.loadBooksSuccess({ books })),
          catchError(error => of(BookActions.loadBooksFailure({ error }))))
      )
    );
  });
  */

  loadBooksLazy$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(BookActions.loadBooks),
      withLatestFrom(this.store.select(selectBooks), this.store.select(selectLastUpdate)),
      map(([, books, lastUpdate]) => ({ books, lastUpdate })),
      switchMap(({ books, lastUpdate }) =>

        books.length &&
        (Date.now() - lastUpdate < 10 * 1000) ? of(BookActions.loadBooksSuccess({ books, lastUpdate })) :

        this.booksStore.getBooks().pipe(
          map(books => BookActions.loadBooksSuccess({ books, lastUpdate: Date.now() })),
          catchError(error => of(BookActions.loadBooksFailure({ error }))))
      )
    );
  });

  ngrxOnInitEffects() {
    return BookActions.loadBooks();
  }
}
