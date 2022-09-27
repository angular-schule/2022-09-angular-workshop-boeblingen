import { Injectable } from '@angular/core';
import { Book } from './book';

const minRating = 1;
const maxRating = 5;

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  rateUp(book: Book): Book {
    return {
      ...book,
      rating: Math.min(book.rating + 1, maxRating)
    };
  }

  rateDown(book: Book): Book {
    // return {
    //   ...book,
    //   rating: Math.max(book.rating - 1, minRating)
    // };
    book.rating -= 1;
    return book;
  }

  rateUpAllowed(book: Book) {
    return book.rating >= maxRating;
  }

  rateDownAllowed(book: Book) {
    return book.rating <= minRating;
  }
}
