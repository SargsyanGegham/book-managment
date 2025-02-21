import { Box, Button, styled, Typography } from "@mui/material";

export const ModalContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
}));

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));