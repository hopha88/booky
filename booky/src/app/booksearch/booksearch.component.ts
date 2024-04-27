import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-booksearch',
  templateUrl: './booksearch.component.html',
  styleUrls: ['./booksearch.component.css']
})
export class BooksearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  books: Book[] = [];

  SearchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService
  ) {
    this.SearchForm = this.formBuilder.group({
      query: ['']
    });
  }

  onSubmit(): void {
    this.searchQuery = this.SearchForm.value.query.trim();
    console.log(this.searchQuery);
    if (this.searchQuery !== '') {
      this.bookService.getVolume(this.searchQuery).subscribe(
        (response) => {
          this.books = response; 
          console.log('hi');
        },
        (error) => {
          console.error(error);
          console.log("sad");
        }
      );
    } else {
      this.searchResults = [];
    }
  }
}
