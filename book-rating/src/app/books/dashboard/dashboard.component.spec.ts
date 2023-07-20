import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { BookComponent } from '../book/book.component';
import { Component, Input } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'br-book',
  template: '😎',
  standalone: true
})
export class DummyBookComponent {
  @Input() book?: Book;
  @Input() rateDownAllowed?: any;
  @Input() rateUpAllowed?: any;
}

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    const bookRatingMock = {
      rateUp: (book: Book) => book
    }

    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        HttpClientTestingModule
      ], providers: [{
        provide: BookRatingService,
        useValue: bookRatingMock
      }]
    })
    .overrideComponent(DashboardComponent, {
      remove: { imports: [BookComponent] },
      add: { imports: [DummyBookComponent] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    component.books = [{
      isbn: 'Test',
      title: 'Test',
      description: 'Test',
      rating: 3,
      price: 0
    }]
    fixture.detectChanges();
  });

  it('doRateUp() should call the BookRatingService', () => {
    const rs = TestBed.inject(BookRatingService);
    // rs.rateDown({} as Book); // wirft Exception, da nicht vorhanden

    spyOn(rs, 'rateUp').and.callThrough();
    const book = { } as Book;
    component.doRateUp(book);

    expect(rs.rateUp).toHaveBeenCalledOnceWith(book);
  });
});
