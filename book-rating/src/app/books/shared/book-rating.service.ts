import { Injectable } from '@angular/core';
import { Book } from './book';

const minRating = 1;
const maxRating = 5;

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  rateUp(book: Book): Book {
    return book;
  }

  rateDown(book: Book): Book {
    return book;
  }

  rateUpAllowed(book: Book) {
    return book.rating >= maxRating;
  }

  rateDownAllowed(book: Book) {
    return book.rating <= minRating;
  }
}
