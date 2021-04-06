import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksActionsComponent } from './components/books-actions/books-actions.component';
import { BooksListComponent } from './components/books-list/books-list.component';

const routes: Routes = [
  { path: '', component: BooksListComponent },
  {path: 'actions', component: BooksActionsComponent},
  {path: 'actions/:id', component: BooksActionsComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
