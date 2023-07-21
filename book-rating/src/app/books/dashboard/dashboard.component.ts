import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { BookFormComponent } from '../book-form/book-form.component';
import { BookComponent } from '../book/book.component';
import { Book } from '../shared/book';
import { BookFacadeService } from '../store/book.facade';

const DingeDieIchOftBrauche = [NgFor, NgIf, AsyncPipe];

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    BookFormComponent,
    BookComponent,
    ...DingeDieIchOftBrauche
  ]
})
export class DashboardComponent {

  bookFacade = inject(BookFacadeService);
  loading$ = this.bookFacade.loading$;
  books$ = this.bookFacade.books$;

  selectedBook?: Book;

  doRateUp(book: Book) {
    this.bookFacade.rateUp(book);
  }

  doRateDown(book: Book) {
    this.bookFacade.rateDown(book);
  }

  addBook(newBook: Book): void {
    // this.books = [...this.books, newBook];
  }

  changeBook(changeBook: Book): void {
    // this.updateList(changeBook);
    // this.selectedBook = undefined;
  }

  changeToEditMode(book: Book): void {
    // this.selectedBook = book;
  }
}
