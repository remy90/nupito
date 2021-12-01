import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '../src/theme';
import Layout from '../src/Components/Layout';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <Layout>
      <Head>
        <title>Shaun &#38; Char</title>
        <link href="/favicon.ico" rel="icon" />
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Layout>
  );
}
