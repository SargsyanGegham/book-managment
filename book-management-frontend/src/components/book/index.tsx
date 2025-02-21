import React, { useEffect } from 'react';
import BookItem from './BookItem';
import { Masonry } from '@mui/lab';
import { Containner } from './styles';
import useStore from '../../store/store';
import { Book } from '../../store/types';

/**
 * BookList Component
 *
 * Displays a list of books using Masonry layout, and provides actions to edit or delete books.
 *
 * @returns JSX Element with a grid of books.
 */
const BookList: React.FC = () => {
  const { books, deleteBook, setNewBook, toggleEditMode, togglePopup, fetchBooks } = useStore();

  /**
   * Fetches the list of books when the component is mounted.
   */
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  /**
   * Handles the deletion of a book.
   * 
   * @param {number} id - The ID of the book to delete.
   * @returns {void}
   */
  const handleDelete = (id: number) => () => {
    deleteBook(id);
  };

  /**
   * Handles editing a book by setting the book to be edited in the store
   * and opening the edit modal.
   * 
   * @param {Book} book - The book to be edited.
   * @returns {void}
   */
  const handleEdite = (book: Book) => () => {
    setNewBook(book);
    toggleEditMode(true);
    togglePopup(true);
  };

  return (
    <Containner>
      <Masonry columns={4} spacing={2}>
        {books.map((book) => (
          <BookItem 
            key={book.id} 
            book={book} 
            onEdit={handleEdite(book)} 
            onDelete={handleDelete(book.id as number)} 
          />
        ))}
      </Masonry>
    </Containner>
  );
};

export default BookList;
