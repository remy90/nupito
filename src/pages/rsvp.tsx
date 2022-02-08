import * as React from 'react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { NextPage } from 'next';
import Form from '../components/Form';

const RSVP: NextPage = () => (
  <Container maxWidth="sm">
    <Box sx={{ my: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>Répondez, s’il vous plaît</Typography>
      <Form />
    </Box>
  </Container>
);

export default RSVP;
