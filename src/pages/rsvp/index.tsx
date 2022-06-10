import React, {useContext, useEffect} from 'react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type {  NextPage } from 'next';
import RsvpForm from '../../components/RsvpForm';
import { AppContext } from '../../components/AppProvider';
import useUser from '../../lib/useUser';
import { ColouredWord } from 'src/components/ColouredWord';
import Link from 'src/Link';

const RSVP: NextPage = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (!state.guest.id) {
      dispatch({type: 'UPDATE_GUEST', value: {...JSON.parse(localStorage.getItem('shaun_char_guest_2022') ?? '{}')}});
    }
  }, [state.guest.id]);

  const isAttending = state.guest?.isAttending;
  useUser({ redirectTo: '/invitation-only' });

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, marginBottom: '1rem' }}>
        <Typography variant="h1" gutterBottom>
          <ColouredWord color="royalblue">R</ColouredWord>épondez, <ColouredWord color="royalblue">s</ColouredWord>&apos;il <ColouredWord color="royalblue">v</ColouredWord>ous <ColouredWord color="royalblue">p</ColouredWord>laît
        </Typography>
        {isAttending === undefined && <Typography>You have been invited to join us for {
          state.guest.isFed
            ? <>the ceremony, wedding breakfast and evening reception</>
            : <>our evening celebration at the reception venue</>}. If you can attend, please aim to arrive at {
          state.guest.isFed
            ? <>11:30</>
            : <>18:30</>}</Typography>}
        {isAttending === false
          ? <Typography>We&apos;re sad you&apos;re unable to make it to our special day. If you would still like to contribute towards our new life together, please head to our <Link href="/registry">wedding registry</Link></Typography>
          : <RsvpForm />}
      </Box>
    </Container>
  );
};

export default RSVP;
