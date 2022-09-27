import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {

  @Input() book?: Book;
  @Input() rateUpAllowed = (book: Book) => true;
  @Input() rateDownAllowed = (book: Book) => true;

  // simplere Lösung
  // @Input() minRating = 1;
  // @Input() maxRating = 5;


  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();

  doRateUp() {
    this.rateUp.emit(this.book);
  }

  doRateDown() {
    this.rateDown.emit(this.book);
  }
}
