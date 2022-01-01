import * as React from 'react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '../Link';
import type { NextPage } from 'next';
import Form from '../components/Form';

const RSVP: NextPage = () => (
  <Container maxWidth="sm">
    <Head>
      <title>S&#38;C: RSVP</title>
      <link href="/favicon.ico" rel="icon" />
      <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
    </Head>
    <Box sx={{ my: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>Répondez, s’il vous plaît</Typography>
      <Form />
    </Box>
  </Container>
);

export default RSVP;
