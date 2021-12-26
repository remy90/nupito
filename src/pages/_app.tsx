import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import theme from '../theme';
import Layout from '../components/Layout';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Layout>
  );
}
