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

  books$$ = this.store.selectSignal(selectBooks);
  loading$$ = this.store.selectSignal(selectLoading);

  loadBooks() {
    this.store.dispatch(BookActions.loadBooks())
  }

  rateUp(book: Book) {
    this.store.dispatch(BookActions.rateUp({ book }))
  }

  rateDown(book: Book) {
    this.store.dispatch(BookActions.rateDown({ book }))
  }

  startPolling() {
    this.store.dispatch(BookActions.startPolling({ period: 1000 }));
  }

  stopPolling() {
    this.store.dispatch(BookActions.stopPolling());
  }


}
