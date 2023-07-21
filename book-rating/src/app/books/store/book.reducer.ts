import { createFeature, createReducer, on } from '@ngrx/store';
import { BookActions } from './book.actions';
import { Book } from '../shared/book';
import { rateDown, rateUp, updateList } from '../shared/book-rating.service';

export const bookFeatureKey = 'book';

export interface State {
  books: Book[],
  loading: boolean,
  // currentIsbn: string // 2 Quellen der Wahrheit
}

export const initialState: State = {
  books: [],
  loading: false
};

export const reducer = createReducer(
  initialState,

  on(BookActions.loadBooks, state => ({
    ...state,
    loading: true
  })),

  on(BookActions.loadBooksSuccess, (state, { books }) => ({
    ...state,
    loading: false,
    books
  })),

  on(BookActions.loadBooksFailure, state => ({
    ...state,
    loading: false,
    books: []
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

