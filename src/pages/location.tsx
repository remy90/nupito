import type React from 'react';
import Container from '@mui/material/Container';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { Typography } from '@mui/material';
import { GMapCanvas, MapOuter } from '../components/styled';
import { marginTop } from '../styles/sxConstants';

const Location: NextPage = () => (
  <Container maxWidth="sm" style={{height: '100%'}}>
    <Typography variant="h2">Location</Typography>
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
      <Typography component="data">51°51&apos;29.0&quot;N 0°26&apos;07.7&quot;E</Typography><br />
    There will be plenty of parking available on Stebbing road. <br />
    If you don&apos;t wish to use the coordinates above, you can use the following:</Typography><br />
    <Typography component="address" sx={{textAlign: 'center'}}>
      Felsted School <br />
      Essex <br />
      CM6 3LL
    </Typography>
  </Container>
);

export default Location;
