import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../utils/createEmotionCache';
import Layout from '../components/Layout';
import { AppProvider } from '../components/AppProvider';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  isDev: boolean;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, isDev } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Shaun &#38; Char</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Layout>
            <CssBaseline />
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export async function getStaticProps() {
  return { props: { isDev: process.env.NODE_ENV !== 'production' }};
}
