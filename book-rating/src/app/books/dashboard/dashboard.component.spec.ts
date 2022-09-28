import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BookFormComponent } from '../book-form/book-form.component';
import { BookComponent } from '../book/book.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

import { DashboardComponent } from './dashboard.component';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let bookRatingMock: any;

  beforeEach(async () => {

    bookRatingMock = {
      rateUp: (book: Book) => book,
      rateDownAllowed: () => true,
      rateUpAllowed: () => true
    };

    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        BookComponent, // Integration-Test
        BookFormComponent // Integration-Test
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [{
        provide: BookRatingService,
        useValue: bookRatingMock
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doRateUp() should forward all calls to BookRatingService', () => {

    // andere Variante
    // const rs = TestBed.inject(BookRatingService);

    spyOn(bookRatingMock, 'rateUp').and.callThrough();

    const dummyBook = { isbn: '', title: '', description: '', rating: 1, price: 1 };
    component.doRateUp(dummyBook);

    expect(bookRatingMock.rateUp).toHaveBeenCalledOnceWith(dummyBook);
  });
});
