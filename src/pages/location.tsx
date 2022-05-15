import type React from 'react';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { GMapCanvas, MapOuter } from '../components/styled';
import { marginTop } from '../styles/sxConstants';
import useUser from '../lib/useUser';
import { useContext, useEffect } from 'react';
import { AppContext } from '../components/AppProvider';
import { ACTIONS } from '../reducers/actions';

const Location: NextPage = () => {
  const {state, dispatch} = useContext(AppContext);
  useEffect(() => {
    if (!state.guest.id) {
      dispatch({type: 'UPDATE_GUEST', value: {...JSON.parse(localStorage.getItem('shaun_char_guest_2022') ?? '{}')}});
    }
  }, [state.guest.id]);

  useUser({ redirectTo: '/invitation-only' });

  return (
    <Container maxWidth="sm" style={{height: '100%'}}>
      <Typography variant="h2">Location</Typography>
      <Typography>There is a good chance uninvited guests will turn up, please dont share this information.</Typography>
      {state.guest.hasPlusOne && <Typography>If you have filled in your plus one and they can attend, they will also have access to this site</Typography>}
      <MapOuter>
        <GMapCanvas>
          <iframe
            width="100%"
            height="100%"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=51.858041,%200.435479&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
            frameBorder="0"
            scrolling="no"
          ></iframe>    
        </GMapCanvas>
      </MapOuter>
      <Typography sx={marginTop}>Copy the the following into your satnav:<br />
        <Typography component="data">Click on the map for directions</Typography><br /><br />
    There will be plenty of parking available on Stebbing road. <br />
    If you don&apos;t wish to use google maps, you can use the following address:</Typography><br />
      <Typography sx={{mb: '1rem', textAlign: 'center'}} component="address">
      Felsted School <br />
      Essex <br />
      CM6 3LL
      </Typography> <br />
    </Container>
  );};

export default Location;
