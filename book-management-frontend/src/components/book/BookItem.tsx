import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { ActionContainners } from './styles';
import { Book } from '../../store/types';

/**
 * BookItem Component
 *
 * Displays an individual book with options to edit or delete.
 *
 * @param book - Book object containing title, author, and ISBN.
 * @param onDelete - Function to handle book deletion.
 * @param onEdit - Function to handle book editing.
 */
const BookItem: React.FC<{ book: Book; onDelete: () => void; onEdit: () => void }> = ({ book, onDelete, onEdit }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{book.title}</Typography>
        <Typography variant="body1">{book.author}</Typography>
        <Typography variant="body2">{book.isbn}</Typography>
      </CardContent>
      
      <ActionContainners>
        <EditOutlined color="primary" onClick={onEdit} />
        <DeleteOutline color="error" onClick={onDelete} />
      </ActionContainners>
    </Card>
  );
};

export default BookItem;
