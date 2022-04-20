import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { NextPage } from 'next';

const HomePage: NextPage = () =>
  (<Container maxWidth="sm">
    <Box style={{ marginTop: '1rem', width: '100%', maxWidth: '30rem' }}>
      <Typography variant="h2">Invited?</Typography>
      <Typography>Please make sure to use the link provided by Shaun or Charlotte, it should have a unique ID in the url 😎</Typography>
    </Box>
  </Container>);

export default HomePage;
