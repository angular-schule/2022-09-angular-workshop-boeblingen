import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeAll } from 'rxjs';
import { BookStoreService } from '../book-store.service';

@Component({
  selector: 'br-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  books$ = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('isbn')!),
    map(isbn => this.bs.getSingleBook(isbn)),
    mergeAll()
  )

  constructor(
    private route: ActivatedRoute,
    private bs: BookStoreService) { }
}
