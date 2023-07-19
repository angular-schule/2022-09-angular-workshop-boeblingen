import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBook from './book.reducer';
import { Book } from '../shared/book';

export const selectBookState = createFeatureSelector<fromBook.State>(
  fromBook.bookFeatureKey
);

export const selectBooks = createSelector(
  selectBookState,
  state =>  state.books
);

export const selectLoading = createSelector(
  selectBookState,
  state => state.loading
);


// computed selector
export const selectFirstBook = createSelector(
  selectBooks,
  selectLoading,
  (state1, state2)  => state1[0]
);

// deprecated
export const selectBooksByIsbn = createSelector(
  selectBooks,
  (books: Book[], props: any) => books.find(x => x.isbn === props.isbn)
);

// factory selectors
export function getSelectBooksByIsbn(isbn: string) {
  return createSelector(
    selectBooks,
    books => books.find(x => x.isbn === isbn)
  );
}
