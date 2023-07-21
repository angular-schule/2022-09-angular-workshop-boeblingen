import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFacadeService } from '../store/book.facade';
import { DashboardComponent } from './dashboard.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../store/book.reducer';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideMockStore({ initialState }),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doRateUp() should forward all calls to BookFacade', () => {

    const facade = TestBed.inject(BookFacadeService);
    spyOn(facade, 'rateUp').and.callThrough();

    const dummyBook = { isbn: '', title: '', description: '', rating: 1, price: 1 };
    component.doRateUp(dummyBook);

    expect(facade.rateUp).toHaveBeenCalledOnceWith(dummyBook);
  });
});
