import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { EMPTY, interval, of, timer } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, retry, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';

import { BookStoreService } from '../book-store.service';
import { BookActions } from './book.actions';
import { Store } from '@ngrx/store';
import { selectBooks, selectLastUpdate } from './book.selectors';
import { PageActions } from './page.actions';
import { mapToParam, ofRoute } from './utils-ngrx-router/operators';


@Injectable()
export class BookEffects {

  store = inject(Store);
  booksStore = inject(BookStoreService);

  triggerLoadBooks$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(PageActions.ready),
      map(() => BookActions.loadBooks())
    );
  });

  tuWasMitBuch$ = createEffect(() => {
    return inject(Actions).pipe(
      ofRoute(['books/:isbn']),
      mapToParam('isbn'),
      concatMap(isbn => [
        BookActions.tuWasMitBuch({ isbn }),
        ...(isbn === '9783864907791' ? [BookActions.tuWasMitBuch({ isbn })] : [])
      ])
    );
  });

  /*
  loadBooks$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(BookActions.loadBooks),
      switchMap(() =>
        this.booksStore.getBooks().pipe(
          map(books => BookActions.loadBooksSuccess({ books, lastUpdate: 0 })),
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
          retry({
            count: 3,
            delay: 1000
          }),
          map(books => BookActions.loadBooksSuccess({ books, lastUpdate: Date.now() })),
          catchError(error => of(BookActions.loadBooksFailure({ error }))))
      )
    );
  });

  actions = inject(Actions);
  booksService = inject(BookStoreService);

  startPolling$ = createEffect(() => {
    return inject(Actions).pipe(
      ofType(BookActions.startPolling),
      switchMap(({ period }) => // Start polling when startPolling action is dispatched. Cancel old startPolling actions when new polling called.
        timer(0, period).pipe(
          takeUntil(this.actions.pipe(ofType(BookActions.stopPolling))),  // Stop polling when stopPolling action is dispatched.
          exhaustMap(() => // Perform an HTTP request for each value emitted by the interval. Ignore new values until the HTTP request completes.
            this.booksService.getBooks().pipe(
              map(books => BookActions.loadBooksSuccess({ books, lastUpdate: 0 })),
              catchError(() => EMPTY)
            )
          )
        )
      )
    )
  });

  // ngrxOnInitEffects() {
  //   return BookActions.loadBooks();
  // }
}
