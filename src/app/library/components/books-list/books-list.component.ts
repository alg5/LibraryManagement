import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookActions, BookModel } from 'src/app/library/models';
import * as data  from 'src/assets/books.json';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
booksList: BookModel[];
booksListFiltered: BookModel[];
BookActions = BookActions;
lastTime: string;
lastDate:string;
selectedBookId:number = 0;

translations = {
  WelcomeText : "Welcome to Library Management  "
  , LastVisit: " LastVisit "
  , NoDataMessage:  "No books by conditions"  
  , PublicationDate: "Publication Date"
  
  // , ErrorMessageRequares: "This field is mandatory"
  // , ErrorMessageRowsMax: `Number of rows must be less or equal ${this.maxRows}`
}

  constructor(private datePipe: DatePipe
    , private router: Router
    ) { }

  ngOnInit(): void {


    const  lst:  any  = (data  as  any).default;
     this.booksList = lst;
    console.log(this.booksList);
    const now = Date();
    this.lastDate = this.datePipe.transform(now, 'dd/MM/yyyy');
    this.lastTime = this.datePipe.transform(now, 'shortTime');
    this.filterBooks();
    
  }

  onSelectBook($event){
    // console.log("onSelectBook", $event, $event.value);
    this.selectedBookId = $event.value;
    this.filterBooks();
  }
  filterBooks(){
    this.booksListFiltered = this.booksList;
    if (this.selectedBookId > 0){
      this.booksListFiltered = this.booksList.filter(item=>item.CatalogNumber == this.selectedBookId);
    }
  }
  navigateAction(action: BookActions, bookId:number){
    console.log("navigateAction", bookId);
    // switch(action){
    //   case BookActions.Add:
        
    //     break;
    // }
    this.router.navigate(['/library/actions'], { queryParams: { action: action, id:bookId } });
  
  }

}
