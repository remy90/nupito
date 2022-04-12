import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';
import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import { fileDownload } from './api/gridFSFileDownload';
import { fileUpload } from './api/gridFSFileUpload';

const HomePage: NextPage = ({ homePageImagePath }: any) => (
  <Container maxWidth="sm">
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {'Welcome to Shaun and Charlotte\'s wedapp'}
      </Typography>
      <Box style={{ width: '100%', maxWidth: '30rem' }}>
        <Image sizes='100%' src={homePageImagePath} alt="Home page image of shaun and charlotte" />
      </Box>
    </Box>
  </Container>
);
export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require('fs');
  async function exists(path: string) {  
    return fs.existsSync(path);
  }

  const getDirectories = (source: string) =>
    (fs.readdirSync(source, { withFileTypes: true }, (err: any, files: any) => {
      console.log('\nCurrent directory files:');
      if (err)
        console.log(err);
      else {
        files.forEach((file: any) => {
          console.log(file);
        });
      }
    }));

  // uncomment the following to update the db locally without uploading an image to source control
  // await fileUpload('home-page.jpeg', 'home-image01', 'public/private-assets/home-page.jpeg');
  // console.log(`pathy: ${process.cwd()}`);
  console.log(`path2: ${JSON.stringify(getDirectories(process.cwd()))}`);
  if (!(await exists('public/home-page.jpeg'))) {
    await fileDownload('home-page.jpeg', 'home-image01', 'public/home-page.jpeg');
  }

  return { props: {
    homePageImagePath: '/public/home-page.jpeg'
  }};
};

export default HomePage;
