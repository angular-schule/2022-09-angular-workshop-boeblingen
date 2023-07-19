import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStoreService } from '../book-store.service';


@Injectable()
export class BookEffects {

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
}
