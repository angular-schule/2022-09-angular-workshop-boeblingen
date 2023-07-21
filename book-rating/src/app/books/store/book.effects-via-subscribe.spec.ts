import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, Subject, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { Book } from '../shared/book';
import { BookActions } from './book.actions';
import { BookEffects } from './book.effects';
import { BookStoreService } from '../book-store.service';
import { initialState } from './book.reducer';


const testBook: Book = {
  isbn: '000',
  title: 'test',
  description: 'test',
  rating: 5,
  price: 1
};

describe('BookEffects', () => {
  let actions$: Subject<any>;
  let effects: BookEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        {
          provide: BookStoreService,
          useValue: {
            getBooks: () => of([testBook])
          }
        }
      ],
      imports: [RouterTestingModule]
    });

    actions$ = new Subject<Action>();
    effects = TestBed.inject(BookEffects);
  });

  fit('should load books', () => {

    let result: Action;
    effects.loadBooksLazy$.subscribe(action => result = action);

    actions$.next(BookActions.loadBooks());

    expect(result!.type).toBe(BookActions.loadBooksSuccess.type);
  });
});
