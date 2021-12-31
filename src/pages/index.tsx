import * as React from 'react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';
import homePageImg from '../../public/private-assets/home-page.jpeg';
import type { NextPage } from 'next';

const HomePage: NextPage = () => (
  <Container maxWidth="sm">

    {/* <Navigator /> */}
    <Head>
      <title>Shaun &#38; Char</title>
      <link href="/favicon.ico" rel="icon" />
      <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
    </Head>
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {'Welcome to Shaun and Charlotte\'s wedapp'}
      </Typography>
      <Box style={{ width: '100%', maxWidth: '30rem' }}>
        <Image sizes='100%' src={homePageImg} alt="Home page image of shaun and charlotte" />
      </Box>
    </Box>
  </Container>
);

export default HomePage;
