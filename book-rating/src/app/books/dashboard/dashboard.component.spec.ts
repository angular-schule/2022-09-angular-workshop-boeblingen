import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BookFormComponent } from '../book-form/book-form.component';
import { BookComponent } from '../book/book.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

import { DashboardComponent } from './dashboard.component';

@Component({
    selector: 'br-book-form',
    template: '',
    standalone: true
})
class DummyBookFormComponent {
  @Output() create = new EventEmitter<Book>();
  @Output() edit = new EventEmitter<Book>();
  @Input() book?: Book;
}

@Component({
    selector: 'br-book',
    template: '',
    standalone: true
})
class DummyBookComponent {
  @Input() book?: Book;
  @Input() rateUpAllowed?:  () => true;
  @Input() rateDownAllowed?:  () => true;

  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();
}


describe('DashboardComponent', () => {
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
    imports: [DashboardComponent,
        DummyBookFormComponent,
        DummyBookComponent
        // BookComponent, // Integration-Test
        // BookFormComponent // Integration-Test
    ],
    // imports: [
    //   ReactiveFormsModule // Integration-Test
    // ],
    providers: [{
            provide: BookRatingService,
            useValue: bookRatingMock
        }],
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
