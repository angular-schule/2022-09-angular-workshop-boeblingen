import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../shared/book';
import { RouterLink } from '@angular/router';
import { NgIf, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'br-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, RouterLink, CurrencyPipe]
})
export class BookComponent {

  @Input() book?: Book | null;
  @Input() rateUpAllowed = (book: Book) => true;
  @Input() rateDownAllowed = (book: Book) => true;

  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();

  doRateUp() {
    if (this.book) {
      this.rateUp.emit(this.book);
    }
  }

  doRateDown() {
    if (this.book) {
      this.rateDown.emit(this.book);
    }
  }

  log() {
    console.log(+new Date())
  }
}
