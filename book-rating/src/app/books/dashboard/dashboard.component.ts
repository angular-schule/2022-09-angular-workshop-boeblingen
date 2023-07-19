import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BookStoreService } from '../book-store.service';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookComponent } from '../book/book.component';
import { NgFor, NgIf } from '@angular/common';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
    selector: 'br-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [
        BookFormComponent,
        NgFor,
        BookComponent,
        NgIf,
    ],
})
export class DashboardComponent {
  books: Book[] = [];

  selectedBook?: Book;

  constructor(
    public rs: BookRatingService,
    public bs: BookStoreService) {

      this.bs.getBooks().subscribe(b => this.books = b);
  }

  doRateUp(book: Book) {
    // const ratedBook = {
    //   ...book,
    //   rating: Math.min(book.rating + 1, 5)
    // };
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  addBook(newBook: Book): void {
    this.books = [...this.books, newBook];
  }

  changeBook(changeBook: Book): void {
    this.updateList(changeBook);
    this.selectedBook = undefined;
  }

  changeToEditMode(book: Book): void {
    this.selectedBook = book;
  }

  private updateList(ratedBook: Book) {
    this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating)
  }
}
