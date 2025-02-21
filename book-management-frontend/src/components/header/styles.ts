// import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/system';

// Styled components
export const Container = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)',
}));

export const HeaderWrapper = styled(Stack)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  letterSpacing: 1,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: '10px 20px',
  fontWeight: 'bold',
  borderRadius: 2,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  borderRadius: 2,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.dark,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));
