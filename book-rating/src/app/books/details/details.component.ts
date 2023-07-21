import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, mergeAll, mergeMap, of, retry, switchMap } from 'rxjs';
import { BookStoreService } from '../book-store.service';
import { AsyncPipe } from '@angular/common';
import { BookComponent } from '../book/book.component';
import { Store } from '@ngrx/store';
import { selectCurrentBook } from '../store/book.selectors';

@Component({
    selector: 'br-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    standalone: true,
    imports: [BookComponent, RouterLink, AsyncPipe]
})
export class DetailsComponent {

  book$ = inject(Store).select(selectCurrentBook);
}
