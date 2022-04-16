import * as React from 'react';
import Container from '@mui/material/Container';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { Typography } from '@mui/material';

const Readings: NextPage = () => (
  <Container maxWidth="sm">
    <Typography> Readings</Typography>
  </Container>
);

export const getServerSideProps: GetServerSideProps = async({params}: GetServerSidePropsContext) =>
{ return {props: { id: params?.guestId } };};

export default Readings;
