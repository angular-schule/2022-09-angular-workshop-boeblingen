import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BookComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 😭
  it('should work as expected', () => {
    expect(component).toBeTruthy();

    // should not throw an exception!
    component.book = {} as any;
    component.doRateDown();
    component.doRateUp();
    component.log(); // should do nothing here
  });
});
