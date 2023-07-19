import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { BookStoreService } from '../book-store.service';
import { BookActions } from './book.actions';


@Injectable()
export class BookEffects implements OnInitEffects {

  booksStore = inject(BookStoreService);

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

  ngrxOnInitEffects() {
    return BookActions.loadBooks();
  }
}
