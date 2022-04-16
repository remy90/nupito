import React, { useEffect, useContext, useMemo } from 'react';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MongoClient } from 'mongodb';
import { AppContext } from '../../components/AppProvider';
import { Sentry } from '../../utils';
import { IGuestProps } from '../../components/Interfaces';
import { showAttendanceMessage, showMealSelection } from '../../components/formSubmissionTextHelper';

const client = new MongoClient(process.env.MONGODB_URI!);

const GuestPage: NextPage<IGuestProps> = ({
  id,
  firstName,
  isAttending,
  isEating,
  hasPlusOne,
  menuChoices,
}: IGuestProps) => {
  const { dispatch } = useContext(AppContext);
  
  useEffect(() => dispatch({ type: 'UPDATE_ID', value: id }), ['UPDATE_ID', id]);
  useEffect(() => localStorage.setItem('shaun_char_guest_id', id), [id]);
  Sentry.captureMessage(`guestId dispatched for ${id}`, Sentry.Severity.Debug);

  const memoizedAttendanceMessage = useMemo(() => showAttendanceMessage(isAttending, hasPlusOne), [isAttending, hasPlusOne]);
  const memoizedMealSelection = useMemo(() => showMealSelection(menuChoices), [menuChoices]);
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}><Typography>Welcome, {firstName}</Typography>
        <Typography>{memoizedAttendanceMessage}</Typography>
      </Box>
      {isAttending && isEating && memoizedMealSelection}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async({params}: GetServerSidePropsContext) => {
  await client.connect();
  const database = client.db('shaun-charlotte');
  const guests = database.collection('guests');
  const data = await guests.findOne({ id: params?.guestId });

  if (!data) {
    Sentry.captureMessage('possible randomer');
    return { notFound: true };
  }

  return {
    props: {
      id: data.id,
      firstName: data.firstName,
      isAttending: data.isAttending,
      isEating: data.isEating,
      hasPlusOne: data.hasPlusOne,
      menuChoices: data.menuChoices
    }
  };
};

export default GuestPage;
