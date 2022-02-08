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
// export async function getStaticProps(context) {
//   const fs = require('fs');
//   async function exists(path: string) {  
//     return fs.existsSync('public/home-page.jpeg');
//   }
//   // await fileUpload('home-page.jpeg', 'home-image01', 'public/private-assets/home-page.jpeg');
  
//   if (!(await exists('public/home-page.jpeg'))) {
//     await fileDownload('home-page.jpeg', 'home-image01', 'public/home-page.jpeg');
//   }

//   return { props: {
//     homePageImagePath: '/public/home-page.jpeg'
//   }};
// }

export default HomePage;
