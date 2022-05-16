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
  const memoizedMealSelection = useMemo(() => showMealSelection(menu), [menu]);

  return (
    <Suspense fallback={<CircularProgress color="inherit" />}>
      <Container maxWidth="sm" sx={{display: 'flex'}}>
        <Box sx={{width: '100%'}}>
          <Box sx={{ my: 4 }}>
            {isAttending === undefined
              ? <Typography variant="h4" gutterBottom>
          Welcome {firstName}, to Shaun &amp; Charlotte&apos;s guest app
              </Typography>
              : <Typography>Hi, {firstName}</Typography>
            }
            <Typography>{memoizedAttendanceMessage}</Typography>
          </Box>
          {/* {isAttending && isFed && memoizedMealSelection} */}
      
          <Box sx={{ my: 4 }}>
            <Typography>20th August, 2022</Typography>
            <Box style={{ width: '100%', maxWidth: '30rem' }}>
              <Image
                priority
                height={600}
                width={400}
                layout='responsive'
                alt="image of Shaun &amp; Charlotte"
                src="https://web.archive.org/web/20220428094213if_/https://scontent-lhr8-2.cdninstagram.com/v/t51.2885-15/273123452_478220913681949_7440377138742634667_n.jpg?stp=dst-jpg_e35_p750x750_sh0.08&amp;_nc_ht=scontent-lhr8-2.cdninstagram.com&amp;_nc_cat=101&amp;_nc_ohc=nwPWMTqTYeYAX-uqJjt&amp;edm=ALQROFkBAAAA&amp;ccb=7-4&amp;ig_cache_key=Mjc2MzYyNjUzNzMxODE4OTM2NQ%3D%3D.2-ccb7-4&amp;oh=00_AT9rsk2ZhC9j3GjE7CwjyHO5b4ehf-pcxRABNuzkwHpVrA&amp;oe=6270568D&amp;_nc_sid=30a2ef"
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Suspense>
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
