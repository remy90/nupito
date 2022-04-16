import React, {useContext, useEffect, useMemo} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { fileDownload } from './api/gridFSFileDownload';
import { AppContext } from '../components/AppProvider';
import { showAttendanceMessage, showMealSelection } from '../components/formSubmissionTextHelper';
import { Sentry } from '../utils';
import { IGuestProps } from '../components/Interfaces';
import { MongoClient } from 'mongodb';
// import { fileUpload } from './api/gridFSFileUpload';

const HomePage: NextPage<IGuestProps> = ({
  homePageImg,
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
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to {firstName}, to Shaun and Charlotte&apos;s wedapp
        </Typography>
        <Typography>{memoizedAttendanceMessage}</Typography>
      </Box>
      {isAttending && isEating && memoizedMealSelection}
      <Box sx={{ my: 4 }}>
        <Box style={{ width: '100%', maxWidth: '30rem' }}>
          <img width='100%' src={homePageImg} alt="shaun and charlotte" />
        </Box>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({params}: GetServerSidePropsContext) => {
  const client = new MongoClient(process.env.MONGODB_URI!);
  const fs = require('fs');
  async function exists(path: string) {  
    return fs.existsSync(path);
  }
  // await fileUpload('home-page.jpeg', 'home-image01', 'public/private-assets/home-page.jpeg');
  
  if (!(await exists('public/home-page.jpeg'))) {
    await fileDownload('home-page.jpeg', 'home-image01', './public/home-page.jpeg');
  }
  await client.connect();
  const database = client.db('shaun-charlotte');
  const guests = database.collection('guests');
  const data = await guests.findOne({ id: params?.guestId });

  if (!data) {
    Sentry.captureMessage('possible randomer');
    return { notFound: true };
  }

  return { props: {
    homePageImg: 'home-page.jpeg',
    id: data.id,
    firstName: data.firstName,
    isAttending: data.isAttending,
    isEating: data.isEating,
    hasPlusOne: data.hasPlusOne,
    menuChoices: data.menuChoices
  }};
};

export default HomePage;
