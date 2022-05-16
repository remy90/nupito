import type React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { GetStaticProps, NextPage } from 'next';
import { fileDownload } from './api/gridFSFileDownload';
// import { fileUpload } from './api/gridFSFileUpload';

const HomePage: NextPage = () => (
  <Container maxWidth="sm">
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {'Welcome to Shaun and Charlotte\'s wedapp'}
      </Typography>
      <Box style={{ width: '100%', maxWidth: '30rem' }}>
        <img width='100%' src="home-page.jpeg" alt="shaun and charlotte" />
      </Box>
    </Box>
  </Container>);

export const getStaticProps: GetStaticProps = async () => {
  const fs = require('fs');
  async function exists(path: string) {  
    return fs.existsSync(path);
  }
  // await fileUpload('home-page.jpeg', 'home-image01', 'public/private-assets/home-page.jpeg');
  
  if (!(await exists('public/home-page.jpeg'))) {
    await fileDownload('home-page.jpeg', 'home-image01', './public/home-page.jpeg');
  }

  return { props: {}};
};

export default HomePage;
