import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectBooks, selectLoading } from "./book.selectors";
import { BookActions } from "./book.actions";
import { Book } from "../shared/book";

@Injectable({
  providedIn: 'root'
})
export class BookFacadeService {

  store = inject(Store);
  books$ = this.store.select(selectBooks);
  loading$ = this.store.select(selectLoading);

  loadBooks() {
    this.store.dispatch(BookActions.loadBooks())
  }

  rateUp(book: Book) {
    this.store.dispatch(BookActions.rateUp({ book }))
  }

  rateDown(book: Book) {
    this.store.dispatch(BookActions.rateDown({ book }))
  }

}
