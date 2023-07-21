import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { BookComponent } from '../book/book.component';
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
