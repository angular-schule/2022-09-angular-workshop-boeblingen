import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  books: Book[] = [];

  selectedBook?: Book;

  constructor(public rs: BookRatingService) {
    this.books = [
      {
        isbn: '123',
        title: 'Angular =)',
        description: 'Grundlagen und mehr',
        price: 36.9,
        rating: 5
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        price: 32.9,
        rating: 3
      },
      {
        isbn: '333',
        title: 'jQuery',
        description: 'Boah is das alt!',
        price: 3,
        rating: 1
      }
    ];

    // setTimeout(() => this.books = [], 4000);
  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  private updateList(ratedBook: Book) {
    this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating)
  }

  addBook(book: Book): void {

    // TODO! zwischen neuen und altern Büchern unterscheiden!
    this.books = [...this.books, book];
  }

  editBook(book: Book): void {
    this.selectedBook = book;
  }
}
