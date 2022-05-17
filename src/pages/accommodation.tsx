import type React from 'react';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import { List, ListItem, Paper, Typography } from '@mui/material';
import useUser from '../lib/useUser';
import { useContext, useEffect } from 'react';
import { AppContext } from '../components/AppProvider';
import { marginTop } from 'src/styles/sxConstants';
import Image from 'next/image';
import { SpacedListItem } from './styled';

const Accommodation: NextPage = () => {
  const {state, dispatch} = useContext(AppContext);
  useEffect(() => {
    if (!state.guest.id) {
      dispatch({type: 'UPDATE_GUEST', value: {...JSON.parse(localStorage.getItem('shaun_char_guest_2022') ?? '{}')}});
    }
  }, [state.guest.id]);

  useUser({ redirectTo: '/invitation-only' });

  return (
    <Container maxWidth="sm" style={{height: '100%'}}>
      <Typography variant="h2" sx={{marginTop, fontSize: '2.7rem'}}>Accommodation suggestions</Typography>
      <Paper sx={{ mt: '0.5rem', p: '0.5rem'}}>
        <Typography sx={{my: '1rem'}}>Unfortunately, there is a good chance uninvited guests will turn up, please dont share this information.</Typography>
        {state.guest.hasPlusOne && <Typography>If you have filled in your plus one and they can attend, they will also have access to this site</Typography>}
        <List dense={true} sx={{ listStyleType: 'disc', margin: '1rem', padding: '0.4rem' }}>
          <SpacedListItem><a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.ihg.com/holidayinnexpress/hotels/us/en/braintree/wxfbt/hoteldetail?fromRedirect=true&amp;qSrt=sBR&amp;qIta=99502056&amp;icdv=99502056&amp;qSlH=WXFBT&amp;qCpid=100235822&amp;qAAR=IL4D4&amp;qRtP=IL4D4&amp;setPMCookies=true&amp;qSHBrC=EX&amp;qDest=Panners%20%20Roundabout,%20Braintree,%20GB&amp;srb_u=1"
          >
            <img height={'100%'} width={'100%'} src="/HIEBrain.jpeg" />Holiday inn express, Braintree. <strong>20% off</strong></a>
          </SpacedListItem>
          <SpacedListItem><a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.booking.com/hotel/gb/great-hallingbury-manor.en-gb.html?aid=304142&amp;label=Share-Z8IpNr%401652380334&amp;sid=0804895037fd9cea6b14a4ba7dd90a02&amp;all_sr_blocks=3656517_95159179_0_2_0;checkin=2022-08-20;checkout=2022-08-21;dest_id=-2590030;dest_type=city;dist=0;group_adults=1;group_children=0;hapos=1;highlighted_blocks=3656517_95159179_0_2_0;hpos=1;matching_block_id=3656517_95159179_0_2_0;no_rooms=1;req_adults=1;req_children=0;room1=A;sb_price_type=total;sr_order=popularity;sr_pri_blocks=3656517_95159179_0_2_0__6900;srepoch=1652382021;srpvid=a84785a25a4f00c8;type=total;ucfs=1&amp;#hotelTmpl"
          >
            <img height={'100%'} width={'100%'} src="/GHM.jpeg" />Great Hallingbury Manor</a></SpacedListItem>
          <SpacedListItem><a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.radissonhotels.com/en-us/booking/room-display?hotelCode=STNZQ&amp;checkInDate=2022-08-20&amp;checkOutDate=2022-08-21&amp;adults%5B%5D=2&amp;children%5B%5D=0&amp;searchType=lowest"
          >
            <img height={'100%'} width={'100%'} src="/RB.jpg" />Radisson Blu Hotel</a></SpacedListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default Accommodation;
