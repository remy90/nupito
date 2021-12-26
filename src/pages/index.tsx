import * as React from 'react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../Link';
interface IProps {
  griddy: {
    name: string
  };
  isConnected: boolean;
}

export default function HomePage({ griddy, isConnected }: IProps) {
  return (
    <Container maxWidth="sm">
      <Head>
        <title>Shaun &#38; Char</title>
        <link href="/favicon.ico" rel="icon" />
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Congratulations, you made the cut 
        </Typography>
        <p>it  was brutal ✂️</p>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <div>
          {griddy.name}
        </div>
        {isConnected ? (
          <h2 className="subtitle">{'You are \'connected\' to MongoDB'}</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}
      </Box>
    </Container>
  );
}

export const getStaticProps = async () => {
  const response = await fetch('https://localhost:3000/api/grid');
  const griddy = await response.json();

  return {
    props: { 
      griddy,
      isConnected: true
    },
  };
};
