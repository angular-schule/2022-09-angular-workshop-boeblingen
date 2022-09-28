import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, mergeAll, mergeMap, of, retry, switchMap } from 'rxjs';
import { BookStoreService } from '../book-store.service';

@Component({
  selector: 'br-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
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
