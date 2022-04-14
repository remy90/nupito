import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';
import type { GetStaticPropsContext, NextPage } from 'next';
// import homePageImg from '../../public/home-page.jpeg';
import { fileDownload } from './api/gridFSFileDownload';
// import { readdirSync, existsSync } from 'fs';
// import { fileUpload } from './api/gridFSFileUpload';

const HomePage: NextPage = ({ homePageImg }: any) => {
  // debugger;
  console.log(process.cwd());

  
  return(
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {'Welcome to Shaun and Charlotte\'s wedapp'}
        </Typography>
        <Box style={{ width: '100%', maxWidth: '30rem' }}>
          {/* <Image sizes='100%' priority width="100%" height="100%" src={'home-page.jpeg'} alt="Home page image of shaun and charlotte" /> */}
          {/* <div style={{width: '10rem', height: '10rem', backgroundImage: `url(${homePageImg})`}}></div> */}
          <img src="home-page.jpeg" alt="shaun and charlotte" />
        </Box>
      </Box>
    </Container>
  );
};
export async function getStaticProps(context: GetStaticPropsContext) {
  const fs = require('fs');
  async function exists(path: string) {  
    return fs.existsSync(path);
  }
  // await fileUpload('home-page.jpeg', 'home-image01', 'public/private-assets/home-page.jpeg');
  
  if (!(await exists('public/home-page.jpeg'))) {
    await fileDownload('home-page.jpeg', 'home-image01', './public/home-page.jpeg');
  }

  return { props: {
    homePageImg: 'public/home-page.jpeg'
  }};
}

export default HomePage;
