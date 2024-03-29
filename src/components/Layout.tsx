import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import Navigator from './Navigator';
import { StickToEndOfContainer } from './styledcomponents';
import { ProfileLink } from './ProfileLink';

export default function Layout({ children }: ({children: React.ReactNode | Array<React.ReactNode>})) {
  return (
    <Box sx={{ background: '#fecc9a'}}>
      <Head>
        <title>Charlotte &#38; Shaun</title>
        <link href="/favicon.ico" rel="icon" />
        <meta content="initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <Navigator />
      <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <main>{ children }</main>
        <StickToEndOfContainer>
          <ProfileLink />
        </ StickToEndOfContainer>
      </Box>
    </Box>
  );
}
