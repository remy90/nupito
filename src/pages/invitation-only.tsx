import type React from 'react';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';

const InvitationOnly: NextPage = () => 
  <Typography sx={{margin: '1rem'}}>You&apos;ve tried to access a page intended for guests only. If you think you&apos;ve reached this page in error, please refer to your  original message from Shaun/Charlotte or contact us</Typography>;

export default InvitationOnly;
