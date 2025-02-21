import React, { useState, useEffect } from 'react';
import { TextField, Modal, CircularProgress, Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ModalContainer, SubmitButton, Title } from './styles';
import useStore from '../../store/store';

/**
 * BookForm Component
 * 
 * This component represents a form for adding and editing books.
 */
const BookForm = () => {
  // Zustand store hooks
  const {
    isPopupOpen,
    togglePopup,
    isEditMode,
    newBook: book,
    addBook,
    editBook,
    setNewBook,
    toggleEditMode
  } = useStore();

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [isbn, setIsbn] = useState(book.isbn);
  const [loading, setLoading] = useState(false);

  /**
   * Effect to update local form state when the book or popup state changes.
   */
  useEffect(() => {
    if (book && isPopupOpen) {
      setTitle(book.title);
      setAuthor(book.author);
      setIsbn(book.isbn);
    }
  }, [book, isPopupOpen]);

  /**
   * Handles form submission for adding or editing a book.
   * 
   * @param e - Form event to prevent default submission.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode && book) {
        await editBook(book.id as number, { title, author, isbn, id: book.id });
      } else {
        await addBook({ title, author, isbn });
      }
      
      togglePopup(false);
    } catch (error) {
      console.error('Error submitting form', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles closing the modal and resetting form state.
   */
  const handleClose = () => {
    setNewBook({
      title: '',
      author: '',
      isbn: '',
    });
    togglePopup(false);
    toggleEditMode(false);
  };

  return (
    <Modal open={isPopupOpen} onClose={handleClose}>
      <ModalContainer>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Title variant="h6">
          {isEditMode ? 'Edit Book' : 'Add New Book'}
        </Title>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Author"
              variant="outlined"
              fullWidth
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <TextField
              label="ISBN"
              variant="outlined"
              fullWidth
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
            />
            <SubmitButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : isEditMode ? 'Update Book' : 'Add Book'}
            </SubmitButton>
          </Stack>
        </form>
      </ModalContainer>
    </Modal>
  );
};

export default BookForm;
