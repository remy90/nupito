import type React from 'react';
import { Suspense, useContext, useEffect, useMemo } from 'react';
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
import { existsSync } from 'fs';
import { CircularProgress } from '@mui/material';

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

  // TODO: Check if person has id, if not, give a 404 oops message
  // ! TODO: Fix landing page for deployed page

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        {isAttending === undefined
          ? <Typography variant="h4" gutterBottom>
          Welcome, {firstName}, to Shaun and Charlotte&apos;s wedapp
          </Typography>
          : <Typography>Hi, {firstName}</Typography>
        }
        <Typography>{memoizedAttendanceMessage}</Typography>
      </Box>
      {isAttending && isEating && memoizedMealSelection}
      
      <Suspense fallback={<CircularProgress color="inherit" />}>
        <Box sx={{ my: 4 }}>
          <Box style={{ width: '100%', maxWidth: '30rem' }}>
            {/* <img width='100%' src={homePageImg} alt="shaun and charlotte" /> */}
          </Box>
        </Box>
      </Suspense>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async({params}: GetServerSidePropsContext) => {
  // await fileUpload('home-page.jpeg', 'home-image01', 'public/private-assets/home-page.jpeg');
  const client = new MongoClient(process.env.MONGODB_URI!);
  // if (!existsSync('./home-page.jpeg')) {
  //   console.log('downloading image');
  //   await fileDownload('home-page.jpeg', 'home-image01', './home-page.jpeg');
  //   console.log('image upload complete');
  // } else {
  //   console.log('already on the server');
  // }

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
      homePageImg: './home-page.jpeg',
      id: data.id,
      firstName: data.firstName,
      isAttending: data.isAttending,
      isEating: data.isEating,
      hasPlusOne: data.hasPlusOne,
      menuChoices: data.menuChoices
    }
  };
};

export default HomePage;
