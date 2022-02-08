import React, { useEffect, useContext, useMemo } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MongoClient } from 'mongodb';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { AppContext } from '../../components/AppProvider';

const client = new MongoClient(process.env.MONGODB_URI!);

interface IGuestProps {
  Id: string;
  FirstName: string;
  IsAttending: boolean;
  HasPlusOne: boolean;
}

const showAttendanceMessage = (isAttending: boolean, hasPlusOne: boolean) => {
  if (isAttending === undefined || isAttending === null) {
    return 'Head over to the RSVP page to let us know if you can make it';
  }
  return isAttending
    ? `We're glad you're attending our wedding${hasPlusOne ? ', including your plus one.': '!'}`
    : 'We\'ll miss your absence at our wedding!';
};

const GuestPage: NextPage<IGuestProps> = ({
  Id,
  FirstName,
  IsAttending,
  HasPlusOne,
}: IGuestProps) => {

  const { state, dispatch } = useContext(AppContext);
  
  useEffect(() => dispatch({ type: 'UPDATE_ID', value: Id }), ['UPDATE_ID', Id]);
  useEffect(() => localStorage.setItem('shaun_char_guest_id', Id), [Id]);

  const memoizedAttendanceMessage = useMemo(() => showAttendanceMessage(IsAttending, HasPlusOne), [IsAttending, HasPlusOne]);
  console.log(state);
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}><Typography>Welcome, {FirstName}</Typography>
        <Typography>{memoizedAttendanceMessage}</Typography>
      </Box>
    </Container>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await client.connect();
  const database = client.db('shaun-charlotte');
  const guests = database.collection('guests');
  const data = await guests.findOne({ ID: context?.params?.guestId });

  if (!data) {
    return { notFound: true };
  }

  return {
    props: {
      Id: data?.ID,
      FirstName: data?.FirstName,
      IsAttending: data?.IsAttending,
      HasPlusOne: data?.HasPlusOne,
    }
  };
}

export default GuestPage;
