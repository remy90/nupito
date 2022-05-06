import type React from 'react';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';

const Hymns: NextPage = () => (
  <Container maxWidth="sm">
    <Typography variant="h2">Songs of praise</Typography>
  </Container>
);

export default Hymns;
