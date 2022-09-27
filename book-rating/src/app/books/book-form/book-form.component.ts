import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormComponent {

  @Output()
  create = new EventEmitter<Book>();

  @Output()
  edit = new EventEmitter<Book>();

  selectedBook?: Book;

  @Input()
  set book(book: Book | undefined) {

    if (book) {
      this.bookForm.setValue({
        isbn: book.isbn,
        title: book.title,
        description: book.description
      });
      this.c.isbn.disable();
    } else {
      this.c.isbn.enable();
    }

    this.selectedBook = book;
  }

  bookForm = new FormGroup({

    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }),

    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    description: new FormControl('', {
      nonNullable: true
    })
  });

  c = this.bookForm.controls;

  hasError(path: keyof Book): boolean {
    const control = this.bookForm.get(path);
    return !!control && control.touched && control.invalid
  }

  hasError2(control: FormControl): boolean {
    return control.touched && control.invalid;
  }

  submitForm():void {

    if (!this.selectedBook) {

      const newBook = {
        ...this.bookForm.getRawValue(),
        rating: 1,
        price: 1
      };

      this.create.next(newBook);

    } else {

      const updatedBook = {
        ...this.bookForm.getRawValue(),
        rating: this.selectedBook.rating,
        price: this.selectedBook.price
      }
      this.edit.next(updatedBook);
    }

    this.bookForm.reset();
  }
}
