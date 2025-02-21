// src/store/store.ts

import { create } from 'zustand';
import { BookState, Book } from './types';
import {
  addBookAsync,
  editBookAsync,
  deleteBookAsync,
  searchBooksAsync,
  fetchBooksAsync,
} from './actions/bookActions';

// Zustand store for managing books
const useStore = create<BookState>((set) => ({
  books: [], // List of books in the store
  isPopupOpen: false, // Popup state for adding/editing books
  isEditMode: false, // Edit mode toggle
  newBook: {
    title: '',
    author: '',
    isbn: ''
  },

  /**
   * Sets the new book state.
   * 
   * @param book - The book object to set as the new book.
   */
  setNewBook: (book: Book) => set(() => ({ newBook: book })),

  /**
   * Toggles the popup open/close state.
   * 
   * @param state - Boolean value to set popup visibility.
   */
  togglePopup: (state) => set(() => ({ isPopupOpen: state })),

  /**
   * Toggles edit mode.
   * 
   * @param state - Boolean value to enable or disable edit mode.
   */
  toggleEditMode: (state) => set(() => ({ isEditMode: state })),

  /**
   * Async action to add a book.
   * 
   * @param book - The book object to add.
   */
  addBook: async (book: Book) => {
    const newBook = await addBookAsync(book);
    set((state) => ({ books: [...state.books, newBook] }));
  },

  /**
   * Async action to edit an existing book.
   * 
   * @param id - The ID of the book to update.
   * @param updatedBook - The updated book object.
   */
  editBook: async (id: number, updatedBook: Book) => {
    const editedBook = await editBookAsync(id, updatedBook);
    console.log(id, updatedBook);
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id ? { ...editedBook } : book
      ),
    }));
  },

  /**
   * Async action to delete a book.
   * 
   * @param id - The ID of the book to delete.
   */
  deleteBook: async (id: number) => {
    await deleteBookAsync(id);
    set((state) => ({
      books: state.books.filter((book) => book.id !== id),
    }));
  },

  /**
   * Async action to search for books.
   * 
   * @param query - The search criteria as a Book object or filter parameters.
   * @returns A Promise resolving to an array of matching books.
   */
  searchBooks: async (query: Book | object) => {
    const results = await searchBooksAsync(query);
    set({ books: results });
    return results;
  },

  /**
   * Async action to fetch all books from the database.
   * 
   * @returns A Promise resolving to an array of all books.
   */
  fetchBooks: async () => {
    const results = await fetchBooksAsync();
    set({ books: results });
    return results;
  },
}));

export default useStore;
