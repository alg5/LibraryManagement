export class BookModel
{
    AuthorName:string;
    BookName:string;
    PublicationDate:Date;
    CoverPhoto:string;        
    CatalogNumber:number;  
}
export enum BookActions {
    Add = 1,
    Edit,
    Delete
  }