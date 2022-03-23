import * as React from 'react';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import MenuForm from '../components/MenuForm';

//TODO: Disable changes after specific date
const Menu: NextPage = () => (
  <Container maxWidth="sm">
    <Box sx={{ my: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>Wedding breakfast menu</Typography>
      <MenuForm />
    </Box>
  </Container>
);

export default Menu;
