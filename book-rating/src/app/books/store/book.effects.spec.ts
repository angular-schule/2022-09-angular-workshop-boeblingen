import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BookEffects } from './book.effects';

describe('BookEffects', () => {
  let actions$: Observable<any>;
  let effects: BookEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BookEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(BookEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
