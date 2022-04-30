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
import Image from 'next/image';

// import { fileUpload } from './api/gridFSFileUpload';

const HomePage: NextPage<IGuestProps> = ({
  id,
  firstName,
  isAttending,
  isEating,
  hasPlusOne,
  menuChoice,
}: IGuestProps) => {
  const { dispatch, state } = useContext(AppContext);

  useEffect(() => dispatch({ type: 'UPDATE_GUEST', value: { guest: {id, firstName, isAttending, isEating, hasPlusOne, menuChoice }}}),
    ['UPDATE_GUEST', id, firstName, isAttending, isEating, hasPlusOne, menuChoice]);
  useEffect(() => localStorage.setItem('shaun_char_guest_id', id), [id]);
  Sentry.captureMessage(`guestId dispatched for ${id}`, Sentry.Severity.Debug);
  console.log(state);
  const memoizedAttendanceMessage = useMemo(() => showAttendanceMessage(isAttending, hasPlusOne), [isAttending, hasPlusOne]);
  const memoizedMealSelection = useMemo(() => showMealSelection(menuChoice), [menuChoice]);

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
      
      <Box sx={{ my: 4 }}>
        <Suspense fallback={<CircularProgress color="inherit" />}>
          <Box style={{ width: '100%', maxWidth: '30rem' }}>
            <img width="100%" height="100%" alt="image of Shaun &amp; Charlotte" src="https://web.archive.org/web/20220428094213if_/https://scontent-lhr8-2.cdninstagram.com/v/t51.2885-15/273123452_478220913681949_7440377138742634667_n.jpg?stp=dst-jpg_e35_p750x750_sh0.08&amp;_nc_ht=scontent-lhr8-2.cdninstagram.com&amp;_nc_cat=101&amp;_nc_ohc=nwPWMTqTYeYAX-uqJjt&amp;edm=ALQROFkBAAAA&amp;ccb=7-4&amp;ig_cache_key=Mjc2MzYyNjUzNzMxODE4OTM2NQ%3D%3D.2-ccb7-4&amp;oh=00_AT9rsk2ZhC9j3GjE7CwjyHO5b4ehf-pcxRABNuzkwHpVrA&amp;oe=6270568D&amp;_nc_sid=30a2ef"
            />
          </Box>
        </Suspense>
      </Box>
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
      id: data.id,
      firstName: data.firstName,
      isAttending: data.isAttending,
      isEating: data.isEating,
      hasPlusOne: data.hasPlusOne,
      menuChoice: data.menuChoice
    }
  };
};

export default HomePage;
