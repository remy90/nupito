import React, {useContext} from 'react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import RsvpForm from '../../components/RsvpForm';
import { AppContext } from '../../components/AppProvider';

const RSVP: NextPage = () => {
  const { state } = useContext(AppContext);
  const isAttending = state.isAttending; // add db check in getStaticProps here?
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

export const getServerSideProps: GetServerSideProps = async({params}: GetServerSidePropsContext) => {
  return {props: { id: params?.guestId } };
};

export default RSVP;
