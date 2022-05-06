import type React from 'react';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { useSession } from 'next-auth/react';

// TODO: if state id is null, set state from url value (on each page!?)
const Registry: NextPage = () => {
  
  const { data: session } = useSession();
  return session ? (
    <Container maxWidth="sm">
      <Typography variant="h2">Registry</Typography>
    </Container>
  ): null;};


export default Registry;
