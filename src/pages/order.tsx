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
      <Paper>
        <Timeline>
          <TimelineElement name="Entrance of the Bride" />
          <TimelineElement name={<Link href="/songs">Hymn: Amazing grace</Link>} />
          <TimelineElement name="First reading: Phillippians 2:1-5 - Read by Niya Bekele" />
          <TimelineElement name="Declaration and vows" />
          <TimelineElement name="Sermon: Reverend Nigel J. Little" />
          <TimelineElement name="Vows &amp; exchange of the rings &amp; declaration" />
          <TimelineElement name={<Link href="/songs">Hymn: Our father - Bethel</Link>} />
          <TimelineElement name={<Link href="/songs">Hymn: Reckless Love - Cory Asbury</Link>} />
          <TimelineElement name={<Link href="/songs">Hymn: Worthy - John Wilds</Link>} />
          <TimelineElement name={<Link href="/songs">Hymn: Holy is the Lord God Almighty - Chris Tomlin</Link>} />
          <TimelineElement name={<Link href="/songs">Hymn: Raise a hallelujah - Jonathan &amp; Melissa Helser</Link>} />
          <TimelineElement name={<Link href="/songs">Hymn: Jesus name above all names - KXC</Link>} />
          <TimelineElement name="Second reading: 1 John 4: 7-21" />
          <TimelineElement name="Poem: Two lives become one - read by Shola Ibitoye" />
          <TimelineElement name="Sermon 2 - Reverend Nigel J,. Little" />
          <TimelineElement name="Prayers" />
          <TimelineElement name="Signing of the register" />
          <TimelineElement name="The Lords prayer" />
          <TimelineElement name={<Link href="/songs">Hymn: Ancient of Days - Ron Kenoly</Link>} isLast />
        </Timeline>
      
      </Paper>
    </Container>
  );
};

export default Order;
