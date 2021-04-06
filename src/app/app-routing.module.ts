import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'library' },
  { path: 'library', loadChildren: () => import('./library/library.module').then(m => m.LibraryModule) },

];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
