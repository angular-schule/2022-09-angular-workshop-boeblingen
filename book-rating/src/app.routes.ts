import { Routes } from '@angular/router';
import { DashboardComponent } from './app/books/dashboard/dashboard.component';
import { DetailsComponent } from './app/books/details/details.component';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'books' },
  { path: 'books', component: DashboardComponent },
  { path: 'books/:isbn', component: DetailsComponent, title: 'Book Details' }
];
