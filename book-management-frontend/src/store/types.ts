// src/store/types/bookTypes.ts

export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string; 
}

export interface BookState {
  books: Book[];
  addBook: (book: Book) => Promise<void>;
  editBook: (id: number, updatedBook: Book) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  searchBooks: (query: Book | object) => Promise<Book[]>;
  setNewBook: (book: Book) => void;
  fetchBooks: (filters?: Book) => void;
  isPopupOpen: boolean;
  togglePopup: (state: boolean) => void;
  toggleEditMode: (state: boolean) => void;
  isEditMode: boolean; 
  newBook: Book
}