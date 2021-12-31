import * as React from 'react';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/ban-types
const Hymns: NextPage<{}> = () => (
  <Container maxWidth="sm">
    <Typography>Songs of praise</Typography>
  </Container>
);

export default Hymns;
