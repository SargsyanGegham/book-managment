
import { addBook, deleteBook, fetchBooks, updateBook } from '../../api';
import { Book } from '../types';

/**
 * Asynchronously adds a new book to the database.
 * 
 * @param book - The book object to be added.
 * @returns A Promise resolving to the added book.
 */
export const addBookAsync = async (book: Book): Promise<Book> => {
  return addBook(book);
};

/**
 * Asynchronously updates an existing book.
 * 
 * @param id - The ID of the book to be updated.
 * @param updatedBook - The updated book object.
 * @returns A Promise resolving to the updated book.
 */
export const editBookAsync = async (id: number, updatedBook: Book): Promise<Book> => {
  return updateBook(id, updatedBook);
};

/**
 * Asynchronously deletes a book from the database.
 * 
 * @param id - The ID of the book to be deleted.
 * @returns A Promise resolving to a success message.
 */
export const deleteBookAsync = async (id: number): Promise<string> => {
  return deleteBook(id);
};

/**
 * Asynchronously searches for books based on a query.
 * 
 * @param query - The search criteria, which can be a partial book object or other filters.
 * @returns A Promise resolving to an array of matching books.
 */
export const searchBooksAsync = async (query: Book | object): Promise<Book[]> => {
  return fetchBooks(query);
};

/**
 * Asynchronously fetches all books from the database.
 * 
 * @returns A Promise resolving to an array of all books.
 */
export const fetchBooksAsync = async (): Promise<Book[]> => {
  return fetchBooks();
};
