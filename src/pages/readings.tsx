import type React from 'react';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import {marginTop} from '../styles/sxConstants';

const Readings: NextPage = () => (
  <Container maxWidth="sm">
    <Typography variant="h2" sx={{marginTop}}> Readings</Typography>
  </Container>
);

export default Readings;
