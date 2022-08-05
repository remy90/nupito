import React from 'react';
import { withIronSessionSsr } from 'iron-session/next';
import { User } from '../api/user';
import type { CuisineType, GuestDocument, Menu } from 'src/components/Interfaces';
import { MongoClient } from 'mongodb';
import { Box, Container, Divider, Paper, Typography } from '@mui/material';
import { marginTop } from 'src/styles/sxConstants';

interface IAdmin {
  guests: GuestDocument[];
  user: User | undefined;
}
export const Admin = ({ user, guests }: IAdmin) => {

  // filter where user is attending, is fed but main is missing for their diet type
  const fedGuests = guests.filter(guest => guest?.isAttending && guest.isFed);

  const unresponsiveGuests = guests.filter(guest => guest.isAttending === null);
  const unresponsiveFedGuests = guests.filter(guest => guest.isFed && guest.isAttending === null);
    
  const totalDuckPancakes = guests.filter(guest => guest?.isAttending && guest.cuisine === 'euro' && guest.menu.euroStarter === '15').length;
  const totalHalloumiTart = guests.filter(guest => guest?.isAttending && guest.cuisine === 'euro' && guest.menu.euroStarter === '16').length;
  const totalMelonTrio = guests.filter(guest => guest?.isAttending && guest.cuisine === 'euro' && guest.menu.euroStarter === '17').length;
  const totalOnionAndVeganCheese = guests.filter(guest => guest?.isAttending && guest.cuisine === 'euro' && guest.menu.euroStarter === '18').length;

  const totalPorkos = guests.filter(guest => guest?.isAttending && guest.cuisine === 'euro' && guest.menu.euroMain === '19').length;
  const totalButternut = guests.filter(guest => guest?.isAttending && guest.cuisine === 'euro' && guest.menu.euroMain === '20').length;
  const totalFalafel = guests.filter(guest => guest?.isAttending && guest.cuisine === 'euro' && guest.menu.euroMain === '21').length;

  const totalPassionFruit = guests.filter(guest => guest?.isAttending && guest.menu.euroDessert === '22').length;
  const totalBrulee = guests.filter(guest => guest?.isAttending && guest.menu.euroDessert === '23').length;
  const totalTarts = guests.filter(guest => guest?.isAttending && guest.menu.euroDessert === '24').length;

  const totalSpringRolls = guests.filter(guest => guest?.isAttending && guest.cuisine === 'afro' && guest.menu.foodOption1).length;
  const totalSamosas = guests.filter(guest => guest?.isAttending && guest.cuisine === 'afro' && guest.menu.foodOption2).length;
  const totalPuffs = guests.filter(guest => guest?.isAttending && guest.cuisine === 'afro' && guest.menu.foodOption3).length;
  const totalDodos = guests.filter(guest => guest?.isAttending && guest.cuisine === 'afro' && guest.menu.foodOption4).length;

  const totalJollof = guests.filter(guest => guest?.isAttending && guest.cuisine === 'afro' && guest.menu.foodOption5).length;
  const totalFriedRice = guests.filter(guest => guest?.isAttending && guest.cuisine === 'afro' && guest.menu.foodOption6).length;
  const totalAsaro = guests.filter(guest => guest?.isAttending && guest.cuisine === 'afro' && guest.menu.foodOption7).length;
  const totalEwa = guests.filter(guest => guest?.isAttending && guest.cuisine === 'afro' && guest.menu.foodOption8).length;
  const totalAssortedMeat = guests.filter(guest => guest?.isAttending && guest.cuisine === 'afro' && guest.menu.foodOption9).length;
  const totalEfoRiro = guests.filter(guest => guest?.isAttending && guest.cuisine === 'afro' && guest.menu.foodOption10).length;
  const totalYam = guests.filter(guest => guest?.isAttending && guest.cuisine === 'afro' && guest.menu.foodOption11).length;
  const totalAbula = guests.filter(guest => guest?.isAttending && guest.cuisine === 'afro' && guest.menu.foodOption12).length;
  const totalMoin = guests.filter(guest => guest?.isAttending && guest.cuisine === 'afro' && guest.menu.foodOption13).length;
  const totalSalad = guests.filter(guest => guest?.isAttending && guest.cuisine === 'afro' && guest.menu.foodOption14).length;
  return (
    <Container maxWidth="sm">
      <Paper sx={{px: '2rem'}}>
        <Box sx={{mx: '2rem'}}>
          <Typography sx={{marginTop, px: '0.5rem'}} variant="h2">Admin details</Typography>
          <Typography sx={{px: '0.5rem'}}>Total guests attending: <strong>{guests.length}</strong></Typography>
          <Typography sx={{px: '0.5rem'}}>Number of fed guests: <strong>{fedGuests.length}</strong></Typography>
          <Divider />
          <Box>
            <Typography variant="h3">&apos;Euro&apos; starter totals:</Typography>
            <Typography>Chinese duck pancakes served with spring onion cucumber &amp; Hoi Sin: <strong>{totalDuckPancakes}</strong></Typography>
            <Typography>Balsamic red onion &amp; halloumi tart <strong>{totalHalloumiTart}</strong></Typography>
            <Typography>Trio of melon served with a raspberry coulis <strong>{totalMelonTrio}</strong></Typography>
            <Typography>Balsamic red onion &amp; vegan cheese <strong>{totalOnionAndVeganCheese}</strong></Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant="h3">&apos;Euro&apos; main totals:</Typography>
            <Typography>“Rosa di Marco“ - Italian pork loin stuffed with prosciutto, mozzarella &amp; sage pesto: <strong>{totalPorkos}</strong></Typography>
            <Typography>Roasted butternut squash &amp; shallot risotto with parmesan shavings: <strong>{totalButternut}</strong></Typography>
            <Typography>Trio of falafel with mint mayonnaise: <strong>{totalFalafel}</strong></Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant="h3">&apos;Euro&apos; dessert totals:</Typography>
            <Typography>Passionfruit pannacotta served with blueberry &amp; coulis: <strong>{totalPassionFruit}</strong></Typography>
            <Typography>Raspberry brûlée tart served with raspberries &amp; coulis: <strong>{totalBrulee}</strong></Typography>
            <Typography>Chocolate &amp; orange tart served with chocolate coulis: <strong>{totalTarts}</strong></Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant="h3">🇳🇬 starter totals:</Typography>
            <Typography>Spring roll: <strong>{totalSpringRolls}</strong></Typography>
            <Typography>Samosa: <strong>{totalSamosas}</strong></Typography>
            <Typography>Puff puff: <strong>{totalPuffs}</strong></Typography>
            <Typography>Dodogizzard: <strong>{totalDodos}</strong></Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant="h3">🇳🇬 main totals:</Typography>
            <Typography>Jollof rice: <strong>{totalJollof}</strong></Typography>
            <Typography>Fried rice: <strong>{totalFriedRice}</strong></Typography>
            <Typography>Asaro with sauce: <strong>{totalAsaro}</strong></Typography>
            <Typography>Ewa agoyin with sauce Ayamase with white rice: <strong>{totalEwa}</strong></Typography>
            <Typography>Assorted meat, chicken &amp; fish: <strong>{totalAssortedMeat}</strong></Typography>
            <Typography>Efo riro efo elegusi: <strong>{totalEfoRiro}</strong></Typography>
            <Typography>Pounded yam: <strong>{totalYam}</strong></Typography>
            <Typography>Abula (Gbegiri ewedu amala soup with assorted meat stew): <strong>{totalAbula}</strong></Typography>
            <Typography>Moin-moin: <strong>{totalMoin}</strong></Typography>
            <Typography>Salad: <strong>{totalSalad}</strong></Typography>
          </Box>
          <Divider />
          <Typography variant="h3">Unresponsive guests:</Typography>
          <Typography variant="h3">Total unresponsive guests: <strong>{unresponsiveGuests.length}</strong></Typography>
          <Typography variant="h3">Fed yet unresponsive guests: <strong>{unresponsiveFedGuests.length}</strong></Typography>
          {
            unresponsiveFedGuests
              .sort((a, b) => ('' + a.firstName)
                .localeCompare(b.firstName))
              .map(x => 
                <Typography sx={{px: '0.5rem', py: '0.25rem', }} key={x.id}>{x.firstName} {x?.lastName} ({x.id})</Typography>
              )
          }
          <Divider />
          <Typography variant="h3">Attending guests:</Typography>
          {
            fedGuests
              .sort((a, b) => ('' + a.firstName)
                .localeCompare(b.firstName))
              .map(x => 
                <Typography sx={{px: '0.5rem', py: '0.25rem', }} key={x.id}>{x.firstName} {x?.lastName} ({x.id})</Typography>
              )
          }
        </Box>
      </Paper>
    </Container>);
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
    const guests = await database.collection('guests').aggregate().toArray();

    const guestData: { id: string, firstName: string; lastName: string; isAttending: boolean; isFed: boolean; cuisine: CuisineType, menu: Menu }[] = [];
    guests.forEach(x => guestData.push({
      id: x.id,
      firstName: x?.firstName,
      lastName: x?.lastName ?? '',
      isAttending: x?.isAttending ?? null,
      isFed: x.isFed ?? null,
      cuisine: x?.cuisine ?? null,
      menu: x?.menu ?? {}
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

export default Admin;
