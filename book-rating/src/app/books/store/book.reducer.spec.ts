import { HttpErrorResponse } from '@angular/common/http';
import { Book } from '../shared/book';
import { BookActions } from './book.actions';
import { reducer, initialState } from './book.reducer';

fdescribe('Book Reducer', () => {
  describe('loadBooks action', () => {
    it('should set loading to true', () => {
      const action = BookActions.loadBooks();
      const state = reducer(initialState, action);

      expect(state).toEqual({ ...initialState, loading: true });
    });
  });

  describe('loadBooksSuccess action', () => {
    it('should update the state books and set loading to false', () => {
      const books: Book[] = [
        { isbn: '1' } as Book,
        { isbn: '2' } as Book
      ];
      const action = BookActions.loadBooksSuccess({ books });
      const state = reducer(initialState, action);

      expect(state).toEqual({ ...initialState, loading: false, books });
    });
  });

  describe('loadBooksFailure action', () => {
    it('should reset the state books to an empty array and set loading to false', () => {
      const action = BookActions.loadBooksFailure(new HttpErrorResponse({ error: 'bar', status: 403 }));
      const state = reducer(initialState, action);

      expect(state).toEqual({ ...initialState, loading: false, books: [] });
    });
  });

});
