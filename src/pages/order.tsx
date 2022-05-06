import type React from 'react';
import type { NextPage } from 'next';
import { Typography, Container } from '@mui/material';
import { Timeline } from '@mui/lab';
import { TimelineElement } from '../components/TimelineElement';

const Order: NextPage =  () => (
  <Container maxWidth="sm">
    <Typography variant="h2">Order of service</Typography>
    <Timeline>
      <TimelineElement name="Procession - bridal party" />
      <TimelineElement name="Welcome &amp; prayer" />
      <TimelineElement name="Declatory &amp; contracting words" />
      <TimelineElement name="Scripture recital" />
      <TimelineElement name="Worship" />
      <TimelineElement name="Sermon" />
      <TimelineElement name="Worship" />
      <TimelineElement name="Vows" />
      <TimelineElement name="Ring exchange" isLast/>
    </Timeline>
  </Container>
);

export default Order;
