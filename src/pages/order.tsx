import type React from 'react';
import { Typography, Container, Paper } from '@mui/material';
import { Timeline } from '@mui/lab';
import { TimelineElement } from '../components/TimelineElement';
import useUser from '../lib/useUser';
import {marginTop} from '../styles/sxConstants';
import Link from 'src/Link';

const Order = () => {
  useUser({ redirectTo: '/invitation-only' });
  return (
    <Container maxWidth="sm">
      <Typography variant="h2" sx={{marginTop}}>Order of service</Typography>
      <Paper><Timeline>
        <TimelineElement name="Entrance of the Bride" />
        <TimelineElement name="Welcome &amp; prayer" />
        <TimelineElement name="Declatory &amp; contracting words" />
        <TimelineElement name="Scripture recital" />
        <TimelineElement name={<Link href="/songs">Worship</Link>} />
        <TimelineElement name="Sermon" />
        <TimelineElement name={<Link href="/songs">Worship</Link>} />
        <TimelineElement name="Vows" />
        <TimelineElement name="Ring exchange" isLast/>
      </Timeline>
      
      </Paper>
    </Container>
  );
};

export default Order;
