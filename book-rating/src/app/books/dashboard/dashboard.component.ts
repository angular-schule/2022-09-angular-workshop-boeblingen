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
  ],
})
export class DashboardComponent {

  loading$ = inject(BookFacadeService).loading$;
  books$ = inject(BookFacadeService).books$;

  selectedBook?: Book;

  doRateUp(book: Book) {
    // const ratedBook = {
    //   ...book,
    //   rating: Math.min(book.rating + 1, 5)
    // };
    // const ratedBook = this.rs.rateUp(book);
    // this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    // const ratedBook = this.rs.rateDown(book);
    // this.updateList(ratedBook);
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

  private updateList(ratedBook: Book) {
    // this.books = this.books
    //   .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
    //   .sort((a, b) => b.rating - a.rating)
  }
}
