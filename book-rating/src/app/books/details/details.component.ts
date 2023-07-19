import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, mergeAll, mergeMap, of, retry, switchMap } from 'rxjs';
import { BookStoreService } from '../book-store.service';
import { AsyncPipe } from '@angular/common';
import { BookComponent } from '../book/book.component';

@Component({
    selector: 'br-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    standalone: true,
    imports: [BookComponent, RouterLink, AsyncPipe]
})
export class DetailsComponent {

  book$ = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('isbn')!),
    switchMap(isbn => this.bs.getSingleBook(isbn).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => of({
        isbn: '0000',
        title: 'FEHLER',
        description: err.message,
        rating: 1,
        price: 1
      }))
    ))
  );

  constructor(
    private route: ActivatedRoute,
    private bs: BookStoreService) { }
}
