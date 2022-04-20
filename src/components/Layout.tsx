import React from 'react';
import Head from 'next/head';
import { Box, Link, Typography } from '@mui/material';
import Navigator from './Navigator';
import { StickToEndOfContainer } from './styledcomponents';
import { ProfileLink } from './ProfileLink';

export default function Layout({ children }: ({children: React.ReactChild | Array<React.ReactChild>})) {
  return (
    <Box>
      <Head>
        <title>Shaun &#38; Char</title>
        <link href="/favicon.ico" rel="icon" />
        <meta content="initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <Navigator />
      <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <main style={{height: '100%'}}>{ children }</main>
        <StickToEndOfContainer>
          <ProfileLink />
        </ StickToEndOfContainer>
      </Box>
    </Box>
  );
}
