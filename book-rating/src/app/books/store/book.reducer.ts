import { createFeature, createReducer, on } from '@ngrx/store';
import { BookActions } from './book.actions';
import { Book } from '../shared/book';
import { rateDown, rateUp, updateList } from '../shared/book-rating.service';

export const bookFeatureKey = 'book';

export interface State {
  books: Book[],
  loading: boolean,
  // currentIsbn: string // 2 Quellen der Wahrheit
  lastUpdate: number
}

export const initialState: State = {
  books: [],
  loading: false,
  lastUpdate: 0
};

export const reducer = createReducer(
  initialState,

  on(BookActions.loadBooks, state => ({
    ...state,
    loading: true
  })),

  on(BookActions.loadBooksSuccess, (state, { books, lastUpdate }) => ({
    ...state,
    loading: false,
    books,
    lastUpdate
  })),

  on(BookActions.loadBooksFailure, state => ({
    ...state,
    loading: false,
    books: [],
    lastUpdate: 0
  })),

  // übersichtlicher
  on(BookActions.rateUp, (state, { book }) => {

    const ratedBook = rateUp(book);
    const books = updateList(state.books, ratedBook);
    return {
      ...state,
      books
    };
  }),

  // kürzer
  on(BookActions.rateDown, (state, { book }) => ({
    ...state,
    books: updateList(state.books, rateDown(book))
  })),



);

export const bookFeature = createFeature({
  name: bookFeatureKey,
  reducer
});

