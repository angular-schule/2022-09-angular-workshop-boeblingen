import { Book } from './book';
import { rateDown, rateUp } from './book-rating.service';

describe('Rating helper', () => {
  let book: Book;

  beforeEach(() => {
    book = {
      isbn: '',
      title: '',
      description: '',
      rating: 3,
      price: 1
    };
  });

  it('should rate up a book by one', () => {
    const ratedBook = rateUp(book);
    expect(ratedBook.rating).toBe(4);
  });

  it('should rate down a book by one', () => {
    const ratedBook = rateDown(book);
    expect(ratedBook.rating).toBe(2);
  });

  it('should not rate higher than 5', () => {
    book.rating = 5;
    const ratedBook = rateUp(book);
    expect(ratedBook.rating).toBe(5);
  });

  it('should not rate lower than 1', () => {
    book.rating = 1;
    const ratedBook = rateDown(book);
    expect(ratedBook.rating).toBe(1);
  });
});
