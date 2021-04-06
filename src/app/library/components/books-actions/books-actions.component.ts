import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookActions, BookModel } from '../../models';
import { noWhitespaceValidator} from 'src/app/library/validators/book.Validator';
import * as data  from 'src/assets/books.json';

@Component({
  selector: 'app-books-actions',
  templateUrl: './books-actions.component.html',
  styleUrls: ['./books-actions.component.css']
})
export class BooksActionsComponent implements OnInit {

  sub: any;
  action:BookActions ;
  bookId:number;
  rForm: FormGroup;
  headerTxt:string;
  header2Txt:string;
  BookActions = BookActions;
  newBook: BookModel;
  bookDetails: BookModel;
  constructor(
    private router: Router
              , private activatedRoute: ActivatedRoute
              , private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute
    .queryParams
    .subscribe(params => {
      this.action = +params['action'] || BookActions.Add;
      this.bookId = +params['id'] || 0;
      this.setDataByAction();
      console.log(" this.bookId",  this.bookId);

    });       
    this.rForm = this.fb.group({
      bookName : ['', [Validators.required, Validators.minLength(2), noWhitespaceValidator]],
      autorName : ['', [Validators.required, Validators.minLength(2), noWhitespaceValidator]],
      bookPublishDate : ['', [Validators.required]],        
      coverPhoto : ['', []],
      });

    if (this.action != BookActions.Add){
      // setTimeout(() => this.getBookDetails(this.bookId));
      this.getBookDetails(this.bookId);
    }
  }
  ngAfterViewInit(){
 
  }
  getBookDetails(id: number)
  {
    const  lst:  any  = (data  as  any).default;
    const booksList: BookModel[] = lst;
    const arr = booksList.filter(item=>item.CatalogNumber == id);
    if (arr?.length > 0){
      this.bookDetails = arr[0];

      //TODO
      this.rForm.patchValue({
        bookName: this.bookDetails.BookName,
        autorName: this.bookDetails.AuthorName,
        bookPublishDate: this.bookDetails.PublicationDate,  
         pictureName: this.bookDetails.CoverPhoto,
         coverPhoto: this.bookDetails.CoverPhoto
      });
    }
  }
  setDataByAction(){
    switch (this.action)
    {
      case BookActions.Add:
        this.headerTxt = "Add Book";
        this.header2Txt = "New book";
        break;
      case BookActions.Edit:
        this.headerTxt = "Edit book details";
        this.header2Txt = "Book Details";
        break;
      case BookActions.Delete:
        this.headerTxt = "Delete Book";
        this.header2Txt = "Book Details";
        // this.forceTrue = true;
        break;

    }

  }
  getBookNameAlert()
  {
    const bookNameControl = this.rForm.get('bookName');
    const arrErrs = Object
            .keys(bookNameControl.errors)
            // .map(k => Object.keys(myJSON.countries[k].currencies)[0])
            ;
    console.log("getBookNameAlert", bookNameControl.errors, bookNameControl.errors[0], arrErrs );

    let res = "";
    if (arrErrs.length > 0)
    {
      switch (arrErrs[0])
      {
        case "required":
        case "whitespace":      
          res = "Book name requared";
          break;
        case "minlength":
          res = "Book name lengh too small";
          break;          
        // case "maxlength":
        //   res = this.translations.AlbumCaptionAlert3;
        //   break;          
        case "BookNameExist":
          res = "Book Name Already Exists";
          break; 
        // case "unexpectedError":
        //   res = this.translations.UnexpectedErrorAlert;
        //   break;                 
      }
    }
     
  return res;
    

    
    
  }
  addNewBook()
  {
    // this.submitted = true;
    this.validateAllFormFields(this.rForm);

    if( this.rForm.valid)
    {
    this.newBook =  new BookModel();
    
    // console.log("sendNewAlbum:files" , this.files[0]) ;
    // this.newAlbum.Id = 0;
    this.newBook.BookName = this.rForm.get('bookName').value;
    this.newBook.AuthorName =  this.rForm.get('autorName').value; 
    this.newBook.PublicationDate = this.rForm.get('bookPublishDate').value; 
    this.newBook.CoverPhoto = ""; //TODO
    
      //TODO
      // Add newalbum to service


    
    }
  }


  updateBook(){
    if (this.rForm.valid)
    {

      this.bookDetails.BookName = this.rForm.get('bookName').value.trim();
      this.bookDetails.AuthorName =  this.rForm.get('autorName').value; 
      this.bookDetails.PublicationDate = this.rForm.get('bookPublishDate').value; 
      this.bookDetails.CoverPhoto = ""; //TODO
      //TODO
      // send bookDetails to service for update
 
    }
  }

  
  deleteBook(){
    //TODO
    // add dialog to confirm
    // if confirm
    this.deleteBook();
 
  }
  deleteBookConfirm(){
    console.log("Implement delete functionality here");
   //TODO
      // send bookDetails to service for delete
  }



  validateAllFormFields(formGroup: FormGroup) {         //{1}
  Object.keys(formGroup.controls).forEach(field => {  //{2}
    const control = formGroup.get(field);             //{3}
    if (control instanceof FormControl) {             //{4}
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {        //{5}
      this.validateAllFormFields(control);            //{6}
    }
  });
}

}
