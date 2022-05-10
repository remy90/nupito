import type React from 'react';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import Link from '../Link';

const Registry: NextPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography>Wedding registry</Typography>
      <Link href="https://www.johnlewis.com/wish-list/HTQFMTT">John Lewis</Link>
      <Link href="https://www.thingstogetme.com/397120a9a060">Made.com items</Link>
      <Typography variant="h3">Gift address:</Typography>
      <Typography>Shaun &amp; Charlote</Typography>  
      <Typography>33 Plough rise</Typography>
      <Typography>RM14 1XR</Typography> <br/>

      <Typography variant="h4">Alternatively, if you would like to donate towards our life in Wanstead, please find our bank details below:</Typography> <br />
      <Typography>Jeremy Gaisie </Typography> <br/>
      <Typography>07930032</Typography> <br/>
      <Typography>608371</Typography>
    </Container>
  );
};

export default Registry;
