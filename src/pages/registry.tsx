import type React from 'react';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import useUser from '../lib/useUser';

// TODO: if state id is null, set state from url value (on each page!?)
const Registry: NextPage = () => {
  const { user } = useUser({
    redirectTo: '/login',
  });
  return user?.isLoggedIn ? (
    <Container maxWidth="sm"><Typography>YESSSSSSSS!!!</Typography>
    </Container>) : (<Typography>Nope</Typography>);
};


export default Registry;
