import type React from 'react';
import './styles/global.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../utils/createEmotionCache';
import Layout from '../components/Layout';
import { AppProvider } from '../components/AppProvider';
import { SWRConfig } from 'swr';
import fetchJson from '../lib/fetchJson';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  isDev: boolean;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Charlotte &#38; Shaun</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <ThemeProvider theme={theme}>
        <SWRConfig
          value={{
            fetcher: fetchJson,
            onError: console.error,
          }}
        >
          <AppProvider>
            <Layout>
              <CssBaseline />
              <Component {...pageProps} />
            </Layout>
          </AppProvider>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}
