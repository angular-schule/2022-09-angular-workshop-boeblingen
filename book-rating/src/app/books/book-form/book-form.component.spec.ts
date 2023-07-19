import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormComponent } from './book-form.component';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BookFormComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Bitte so nicht schummeln! :-(
  // it('should do important stuff', () => {
  //   const dummyBook = { isbn: '', title: '', description: '', rating: 1, price: 1 };
  //   component.book = dummyBook;
  //   component.book = undefined;
  //   expect(component).toBeTruthy();
  // });
});
