import type React from 'react';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import useUser from '../lib/useUser';
import { useContext, useEffect } from 'react';
import { AppContext } from '../components/AppProvider';
import Link from '../Link';

const Accommodation: NextPage = () => {
  const {state, dispatch} = useContext(AppContext);
  useEffect(() => {
    if (!state.guest.id) {
      dispatch({type: 'UPDATE_GUEST', value: {...JSON.parse(localStorage.getItem('shaun_char_guest_2022') ?? '{}')}});
    }
  }, [state.guest.id]);

  useUser({ redirectTo: '/invitation-only' });

  return (
    <Container maxWidth="sm" style={{height: '100%'}}>
      <Typography variant="h2">Accommodation suggestions</Typography>
      <Typography sx={{margin: '1rem'}}>Unfortunately, there is a good chance uninvited guests will turn up, please dont share this information.</Typography>
      {state.guest.hasPlusOne && <Typography>If you have filled in your plus one and they can attend, they will also have access to this site</Typography>}
      <Link href="">20% off at the holiday inn</Link>
    </Container>
  );
};

export default Accommodation;
