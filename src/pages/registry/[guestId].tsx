import type React from 'react';
import Container from '@mui/material/Container';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { Typography } from '@mui/material';

// TODO: if state id is null, set state from url value (on each page!?)
const Registry: NextPage = () => (
  <Container maxWidth="sm">
    <Typography variant="h2">Registry</Typography>
  </Container>
);

export const getServerSideProps: GetServerSideProps = async({params}: GetServerSidePropsContext) =>
{ return {props: { id: params?.guestId } };};

export default Registry;
