import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  readonly minRating = 1;
  readonly maxRating = 5;

  rateUp(book: Book): Book {
    return {
      ...book,
      rating: Math.min(book.rating + 1, this.maxRating)
    };
  }

  rateDown(book: Book): Book {
    return {
      ...book,
      rating: Math.max(book.rating - 1, this.minRating)
    };
  }

  rateUpAllowed = (book: Book) => {
    return book.rating < this.maxRating;
  }

  rateDownAllowed = (book: Book) => {
    return book.rating > this.minRating;
  }
}
