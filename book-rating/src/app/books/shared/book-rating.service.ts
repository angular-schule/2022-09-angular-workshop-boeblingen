import { Injectable } from '@angular/core';
import { Book } from './book';

const minRating = 1;
const maxRating = 5;

export function rateUp(book: Book): Book {
  if (!rateUpAllowed(book)) {
    return book; // same reference 👍
  }

  return {
    ...book,
    rating: book.rating + 1
  };
}

export function rateDown(book: Book): Book {

  if (!rateDownAllowed(book)) {
    return book; // same reference 👍
  }

  return {
    ...book,
    rating: book.rating - 1
  };
}

export function updateList(books: Book[], ratedBook: Book) {
  return books
    .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
    .sort((a, b) => b.rating - a.rating)
}

export function rateUpAllowed(book: Book) {
  return book.rating < maxRating;
}

export function rateDownAllowed(book: Book) {
  return book.rating > minRating;
}
