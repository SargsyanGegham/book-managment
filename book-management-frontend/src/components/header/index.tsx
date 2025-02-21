import React, { useState, useEffect } from 'react';
import { InputAdornment, Stack } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useDebouncedValue } from '../../hooks/useDebouncedValue'; // Assuming this hook is defined elsewhere
import { Container, HeaderWrapper, StyledButton, StyledTextField, Title } from './styles';
import useStore from '../../store/store'; // Import the Zustand store

export default function Header() {
  // Get the searchBooks action from the Zustand store
  const { searchBooks, togglePopup, toggleEditMode } = useStore();

  const [filters, setFilters] = useState({ title: '', author: '', isbn: '' });

  // Debounce all filters
  const debouncedTitle = useDebouncedValue(filters.title, 500);
  const debouncedAuthor = useDebouncedValue(filters.author, 500);
  const debouncedIsbn = useDebouncedValue(filters.isbn, 500);


  // Effect to trigger search when any debounced filter changes
  useEffect(() => {
    // Call the searchBooks action with the generated query
    const filteredObj = Object.entries({
      title: debouncedTitle,
      author: debouncedAuthor,
      isbn: debouncedIsbn,
    }).reduce((acc, [key, val]) => val ? { ...acc, [key]: val } : acc, {})
    searchBooks(filteredObj);
  }, [debouncedTitle, debouncedAuthor, debouncedIsbn, searchBooks]);

  // Update filters state
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: e.target.value,
    }));
  };

  const handleOpenPopup = () => {
    togglePopup(true)
    toggleEditMode(false)
  }

  return (
    <Container>
      {/* Header Section */}
      <HeaderWrapper direction="row" spacing={2}>
        <Title variant="h5">Book Management</Title>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleOpenPopup}
        >
          Add Book
        </StyledButton>
      </HeaderWrapper>

      {/* Filters Section */}
      <Stack direction="row" spacing={3}>
        {/* Title Search */}
        <StyledTextField
          label="Search by Title"
          variant="outlined"
          value={filters.title}
          onChange={(e) => handleFilterChange(e, 'title')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />

        {/* Author Search */}
        <StyledTextField
          label="Search by Author"
          variant="outlined"
          value={filters.author}
          onChange={(e) => handleFilterChange(e, 'author')}
        />

        {/* ISBN Search */}
        <StyledTextField
          label="Search by ISBN"
          variant="outlined"
          value={filters.isbn}
          onChange={(e) => handleFilterChange(e, 'isbn')}
        />
      </Stack>
    </Container>
  );
}