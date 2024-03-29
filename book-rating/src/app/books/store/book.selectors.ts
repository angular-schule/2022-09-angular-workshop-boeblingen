import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from '../shared/book';
import { bookFeature } from './book.reducer';
import { selectRouteParam } from './utils-ngrx-router/router.selectors';


export const {
  selectBookState,
  selectBooks,
  selectLoading,
  selectLastUpdate
} = bookFeature;

/*
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
*/


export const selectCurrentIsbn = selectRouteParam('isbn');


export const selectCurrentBook = createSelector(
  selectBooks,
  selectCurrentIsbn,
  (books, isbn) => books.find(book => book.isbn === isbn)
)




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

export function getSelectBooksByIsbn(isbn: string) {
  return createSelector(
    selectBooks,
    books => books.find(x => x.isbn === isbn)
  );
}
