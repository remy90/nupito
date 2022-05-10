import React, {useContext, useEffect} from 'react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type {  NextPage } from 'next';
import RsvpForm from '../../components/RsvpForm';
import { AppContext } from '../../components/AppProvider';
import useUser from '../../lib/useUser';
import { ACTIONS } from '../../reducers/actions';

const RSVP: NextPage = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (!state.guest.id) {
      dispatch({type: ACTIONS.UPDATE_GUEST, value: {...JSON.parse(localStorage.getItem('shaun_char_guest_2022') ?? '{}')}});
    }
  }, [state.guest.id]);

  const isAttending = state.guest?.isAttending;
  useUser({ redirectTo: '/invitation-only' });

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" sx={{fontSize: '5rem'}} gutterBottom>Répondez, s&apos;il vous plaît</Typography>
        {isAttending === false
          ? <Typography>We&apos;re sad you&apos;re unable to make it to our special day. If you would still like to contribute towards our new life together, please find our wedding registry link here</Typography>
          : <RsvpForm />}
      </Box>
    </Container>
  );
};

export default RSVP;
