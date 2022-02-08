import * as React from 'react';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';

const Order: NextPage =  () => (
  <Container maxWidth="sm">
    <Typography>Order of Service</Typography>
    Consider using mui grid?
    1:00 PM
to
3:00 PM
Wedding Day - Ceremony
You are Welcome to our Ceremony. We are so happy to be joined together with all our friends and family!
Unfortunately, not everyone who will be at the ceremony will join us at the reception due to our capacity.

Reception details will only be made available to invitees.
Insert google maps 
ARC - A Radical Church, Sebert Road, Forest Gate, London, UK
Dress Code: Black Tie

Add Event To Calendar

5:00 PM
to
12:00 AM
Reception / Celebrations
!! Strictly Invite Only !! - Unfortunately, the spaces are limited, so we cant invite everyone. However, you are specially invited to come and celebrate/party with us!!

Oasis Banqueting, Thames Road, Barking, UK
Dress Code: Black Tie

Add Event To Calendar

  </Container>
);

export default Order;
