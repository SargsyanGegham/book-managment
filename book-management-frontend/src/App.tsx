import React from 'react';
import BookForm from './components/bookModal/BookForm';
import Header from './components/header';
import './app.css'
import BookList from './components/book';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

// Create a custom theme or use the default one
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', 
    },
    secondary: {
      main: '#9c27b0', 
    },
    background: {
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <BookForm />
      <BookList />      
    </ThemeProvider>
  );
};

export default App;
