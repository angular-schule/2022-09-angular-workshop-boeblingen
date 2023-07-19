import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookComponent } from './book/book.component';
import { BookFormComponent } from './book-form/book-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports: [
        CommonModule,
        BooksRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        DashboardComponent,
        BookComponent,
        BookFormComponent,
        DetailsComponent
    ],
    exports: [
        DashboardComponent
    ]
})
export class BooksModule { }
