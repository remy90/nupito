import type React from 'react';
import { withIronSessionSsr } from 'iron-session/next';
import { User } from '../api/user';
import type { CuisineType, Menu } from 'src/components/Interfaces';
import { MongoClient } from 'mongodb';
import { Box, Container, Divider, Paper, Typography } from '@mui/material';
import { showMealSelection } from 'src/components/formSubmissionTextHelper';
import { IAdmin } from '.';
import { afroMenuMains, afroMenuStarters, dessertItems, euroMainItems, euroStarterItems } from 'src/components/MenuOptions/MenuHelpers';

const listEuroMenu = (menu: Menu) => 
  <Typography>{menu.euroStarter}, {menu.euroMain}, {menu.euroDessert}</Typography>;

const listAfroMenu = (menu: Menu) =>
  <Typography>{
    Array
      .from(Array(14)
        .keys(), n => n + 1)
      .map((foodNumber, index) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
        menu[`foodOption${foodNumber}`] && <span key={foodNumber+index}>{`${foodNumber}, `}</span>)}
  <span>{menu.euroDessert}</span>
  </Typography>;

export const guestMealSelection = ({user, guests}: IAdmin) => {
  return (
    <Box>
      <Typography variant="h2" sx={{paddingLeft: '1rem'}}>Guest Menu Choices</Typography>
      <Box sx={{p: '2rem', width: '50%'}}>
        <Typography variant="h3">Key:</Typography>
        <ul>
          {afroMenuStarters.map(x => <li key={x.key}><Typography key={x.key}>{x.key}: {x.primary}</Typography></li>)}
          {afroMenuMains.map(x => <li key={x.key}><Typography key={x.key}>{x.key}: {x.primary}</Typography></li>)}
          <Divider  />
          {euroStarterItems.map(x => <li key={x.key}><Typography key={x.key}>foodOption{x.key}: {x.primary}</Typography></li>)}
          {euroMainItems.map(x => <li key={x.key}><Typography key={x.key}>foodOption{x.key}: {x.primary}</Typography></li>)}
          {dessertItems.map(x => <li key={x.key}><Typography key={x.key}>foodOption{x.key}: {x.primary}</Typography></li>)}
        </ul>
      </Box>      
      {
        guests.map((x, i) => {
          return (
            <Container key={i}>
              <Paper key={i} sx={{p: '2rem', m: '1rem'}}>
                <>
                  <Typography variant="h3" key={x.id}>{x.firstName} {x.lastName} - Table Number: <strong>{x.tableNo === 0 ? 'Head table' : x.tableNo}</strong></Typography>
                  Ids: {x.cuisine === 'euro' ? listEuroMenu(x.menu) : listAfroMenu(x.menu)}
                  {showMealSelection(x.menu, x.cuisine)}
                </>
              </Paper>
            </Container>);
        })
      }
    </Box>);
};


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user: User | undefined = req.session?.user;

    if (user?.admin !== true) {
      return {
        notFound: true,
      };
    }

    const client = new MongoClient(process.env.MONGODB_URI!);

    await client.connect();
    const database = client.db('shaun-charlotte');
    const guests = await database.collection('guests')
      .find({isAttending: true, isFed: true, cuisine: {$not: {$eq: 'neither' }} })
      .sort({ tableNo: 1 })
      .toArray();

    const guestData: { id: string, firstName: string; lastName: string; cuisine: CuisineType, menu: Menu, tableNo: number }[] = [];
    guests.forEach(x => guestData.push({
      id: x.id,
      firstName: x?.firstName,
      lastName: x?.lastName ?? '',
      cuisine: x?.cuisine ?? null,
      menu: x?.menu ?? {},
      tableNo: x?.tableNo ?? 15
    }));

    return {
      props: {
        user: req.session.user,
        guests: guestData
      },
    };
  },
  {
    cookieName: 'shaun-char-weak-auth',
    password: process.env.SECRET_COOKIE_PASSWORD!,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
);

export default guestMealSelection;
