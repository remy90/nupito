import type React from 'react';
import { Suspense, useContext, useEffect, useMemo } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { AppContext } from '../components/AppProvider';
import { showAttendanceMessage, showMealSelection } from '../components/formSubmissionTextHelper';
import { Sentry } from '../utils';
import { GuestDocument } from '../components/Interfaces';
import { MongoClient } from 'mongodb';
import { CircularProgress} from '@mui/material';
import fetchJson from '../lib/fetchJson';
import useUser from '../lib/useUser';
import Image from 'next/image';
import { ImageContainer } from './styled';

const HomePage: NextPage<GuestDocument> = ({
  id,
  firstName,
  lastName,
  isAttending,
  isFed,
  diet,
  hasPlusOne,
  cuisine,
  menu,
}: GuestDocument) => {
  const { dispatch, state } = useContext(AppContext);
  const {mutateUser} = useUser();
  const guest = {id, firstName, lastName, isAttending, isFed, diet, hasPlusOne, cuisine, menu };

  useEffect(() => dispatch({ type: 'UPDATE_GUEST', value: {guest} }), [id]);
  useEffect(() => localStorage.setItem('shaun_char_guest_2022', JSON.stringify({guest})), [id]);

  useEffect(() => {
    (async () => {
      mutateUser(
        await fetchJson(`/api/login?id=${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(guest),
        }),
        false,
      );
    })();
  }, [state.guest.id]);
  Sentry.captureMessage(`guestId dispatched for ${id}`, Sentry.Severity.Debug);

  const memoizedAttendanceMessage = useMemo(() => showAttendanceMessage(isAttending, hasPlusOne), [isAttending, hasPlusOne]);
  const memoizedMealSelection = useMemo(() => showMealSelection(menu, cuisine), [menu]);

  return (
    <Container maxWidth="sm" sx={{display: 'flex', flexDirection: 'column', padding: 0}}>
      <Box sx={{width: '100%', height: '100%'}}>
        <img
          height={'100%'}
          width={'100%'}
          alt="image of Shaun &amp; Charlotte"
          src="/SandC.jpg"
        />
      </Box>
      <Box sx={{width: '100%', px: '1rem'}}>
        <Box sx={{ my: 4, mt: 0 }}>
          {isAttending === undefined
            ? <Typography variant="h4" gutterBottom>
              Welcome {firstName}, to Shaun &amp; Charlotte&apos;s guest app
            </Typography>
            : <Typography>Hi, {firstName}</Typography>
          }
          <Typography>{memoizedAttendanceMessage}</Typography>
        </Box>
        {isAttending && isFed && memoizedMealSelection}
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {_id, ...guestData} = data;

  return { props: guestData };
};

export default HomePage;
