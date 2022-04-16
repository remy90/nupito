import * as React from 'react';
import Container from '@mui/material/Container';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { Typography } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/ban-types
const Hymns: NextPage<{}> = () => (
  <Container maxWidth="sm">
    <Typography>Songs of praise</Typography>
  </Container>
);

export const getServerSideProps: GetServerSideProps = async({params}: GetServerSidePropsContext) =>
{ return {props: { id: params?.guestId } };};

export default Hymns;
