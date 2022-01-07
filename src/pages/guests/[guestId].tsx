import React, { useEffect, useContext } from 'react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MongoClient } from 'mongodb';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { AppContext } from '../../components/AppProvider';

const client = new MongoClient(process.env.MONGODB_URI!);

interface IGuestProps {
  Id: string;
  FirstName: string;
  IsAttending: boolean;
  HasPlusOne: boolean;
}

const GuestPage: NextPage<IGuestProps> = ({
  Id,
  FirstName,
  IsAttending,
  HasPlusOne,
}: IGuestProps) => {
  const { state, dispatch } = useContext(AppContext);
  useEffect(() => dispatch({ type: 'UPDATE_ID', value: Id }), ['UPDATE_ID', Id]);
  console.log(state);
  return (
    <Container maxWidth="sm">
      <Head>
        <title>Shaun &#38; Char</title>
        <link href="/favicon.ico" rel="icon" />
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <Box sx={{ my: 4 }}><Typography>Welcome, {FirstName}</Typography>
        <Typography>{
          IsAttending
            ? `We're glad you're attending our wedding${HasPlusOne && ', including your plus one'}.`
            : 'We\'ll miss your absence at our wedding!'}
        </Typography>
      </Box>
    </Container>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await client.connect();
  const database = client.db('shaun-charlotte');
  const guests = database.collection('guests');
  const data = await guests.findOne({ ID: context?.params?.guestId });

  if (!data) {
    return { notFound: true };
  }

  return {
    props: {
      Id: data?.ID,
      FirstName: data?.FirstName,
      IsAttending: data?.IsAttending,
      HasPlusOne: data?.HasPlusOne,
    }
  };
}

export default GuestPage;
