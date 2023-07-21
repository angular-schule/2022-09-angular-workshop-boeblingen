import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '../shared/book';
import { HttpErrorResponse } from '@angular/common/http';

export const BookActions = createActionGroup({
  source: 'Book',
  events: {
    'Load Books': emptyProps(),
    'Load Books Success': props<{ books: Book[], lastUpdate: number }>(),
    'Load Books Failure': props<{ error: HttpErrorResponse }>(),

    'Rate Up': props<{ book: Book }>(),
    'Rate Down': props<{ book: Book }>(),

    'Tu Was Mit Buch':  props<{ isbn: string }>(),

    'Start Polling': props<{ period: number }>(),
    'Stop Polling': emptyProps()
  }
});
