import type React from 'react';
import { useContext, useEffect, useMemo } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { AppContext } from '../components/AppProvider';
import { showAttendanceMessage, showMealSelection } from '../components/formSubmissionTextHelper';
import { Sentry } from '../utils';
import { GuestDocument } from '../components/Interfaces';
import { MongoClient } from 'mongodb';
import fetchJson from '../lib/fetchJson';
import useUser from '../lib/useUser';

const HomePage: NextPage<GuestDocument> = ({
  id,
  firstName,
  lastName,
  isAttending,
  isFed,
  diet,
  hasPlusOne,
  isPlusOne,
  cuisine,
  menu,
  guestName,
  tableNo
}: GuestDocument) => {
  const { dispatch, state } = useContext(AppContext);
  const {mutateUser} = useUser();
  const guest = {id, firstName, lastName, isAttending, isFed, diet, hasPlusOne, isPlusOne, cuisine, menu };

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
  const memoizedAttendanceMessage = useMemo(() => showAttendanceMessage(isAttending, hasPlusOne, guestName, isFed), [isAttending, hasPlusOne, guestName, isFed]);
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
              Welcome {firstName}, to our wedding guest app ✨
            </Typography>
            : <Typography variant="h2">Hi, {firstName}.</Typography>
          }

          {memoizedAttendanceMessage}
          {isAttending && <Typography sx={{mt: '1rem'}}>Please be aware: there is a rail strike on the day so be mindful of extra traffic on the roads for your journey to the venue</Typography>}
        </Box>
        {isAttending && isFed && <Typography>You are on <strong>{tableNo === 0 ? 'the head table' : `table ${tableNo}`}</strong></Typography>}
        {['afro', 'euro'].includes(cuisine) && <Typography variant="h3" sx={{mt: '1rem'}}>From the food menu, you have chosen:</Typography>}
        {isAttending && isFed && memoizedMealSelection}
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async({params}: GetServerSidePropsContext) => {
  const client = new MongoClient(process.env.MONGODB_URI!);

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
