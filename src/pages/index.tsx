import type React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { GetStaticProps, NextPage } from 'next';
import { fileDownload } from './api/gridFSFileDownload';
import { useContext, useEffect } from 'react';
import { AppContext } from '../components/AppProvider';
import { GuestDocument } from '../components/Interfaces';
// import { fileUpload } from './api/gridFSFileUpload';

const HomePage: NextPage = () =>
{
  const {state} = useContext(AppContext);
  useEffect(() => {
    if (!state.guest.id){
      return;
    }
    const guest: GuestDocument = JSON.parse(localStorage.getItem(`shaun_char_guest_id-${state.guest.id ?? ''}`) ?? '');
    console.log(guest);
  }, [state.guest.id]);
  return (
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
};

export const getStaticProps: GetStaticProps = async () => {
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
};

export default HomePage;


// import React from 'react';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import type { NextPage } from 'next';

// const HomePage: NextPage = () =>
//   (<Container maxWidth="sm">
//     <Box style={{ marginTop: '1rem', width: '100%', maxWidth: '30rem' }}>
//       <Typography variant="h2">Invited?</Typography>
//       <Typography>Please make sure to use the link provided by Shaun or Charlotte, it should have a unique ID in the url 😎</Typography>
//     </Box>
//   </Container>);

// export default HomePage;
