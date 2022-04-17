import React from 'react';
import Head from 'next/head';
import { Link, Typography } from '@mui/material';
import Navigator from './Navigator';
import { StickToEndOfContainer } from './styledcomponents';

export default function Layout({ children }: ({children: Array<React.ReactChild>})) {
  return (
    <>
      <Head>
        <title>Shaun &#38; Char</title>
        <link href="/favicon.ico" rel="icon" />
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <Navigator />
      <main>{ children }</main>
      <StickToEndOfContainer>
        <div style={{margin: '0vh 2vh'}} >
          <Typography variant="body2" color="text.secondary">Coded by <Link href="https://github.com/remy90">Shaun</Link></Typography>
        </div>
      </ StickToEndOfContainer>
    </>
  );
}
