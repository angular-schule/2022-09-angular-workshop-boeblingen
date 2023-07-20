import { Injectable } from '@angular/core';
import { Book } from './book';

const minRating = 1;
const maxRating = 5;

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  rateUp(book: Book): Book {

    // early return, reference gespart
    if(!this.rateUpAllowed(book)) {
      return book;
    }

    return {
      ...book,
      rating: book.rating + 1
    };
  }

  rateDown(book: Book): Book {

    if(!this.rateDownAllowed(book)) {
      return book;
    }

    return {
      ...book,
      rating: book.rating - 1
    };
  }

  rateUpAllowed(book: Book) {
    return book.rating < maxRating;
  }

  rateDownAllowed(book: Book) {
    return book.rating > minRating;
  }
}
