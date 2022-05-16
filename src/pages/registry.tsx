import type React from 'react';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import { List, ListItem, Paper, Typography } from '@mui/material';
import { CopySelection } from 'src/components/CopySelection';

const Registry: NextPage = () => 
  <Container maxWidth="sm"><Typography variant="h2">Wedding registry</Typography>
    <Paper sx={{p:'1rem', m: '1rem'}}>
      <List dense={true} sx={{ listStyleType: 'disc' }}>
        <ListItem sx={{ display: 'list-item' }}>
          <a target="_blank" href="https://www.johnlewis.com/wish-list/HTQFMTT" rel="noopener noreferrer">John Lewis</a>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <a target="_blank" href="https://www.thingstogetme.com/397120a9a060" rel="noopener noreferrer">Made</a>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <a target="_blank" href="https://www.etsy.com/people/xmlcsxf2/favorites/wedding-registry?ref=cl_share_button" rel="noopener noreferrer">Etsy</a>
        </ListItem>
      </List>
      <Typography variant="h5" sx={{mb: '0.5rem'}}>Gift address: <CopySelection copyText='Shaun and Charlotte, 33 Plough rise, RM14 1XR' /></Typography>
      <Typography>Shaun &amp; Charlotte</Typography>  
      <Typography>33 Plough rise</Typography>
      <Typography>RM14 1XR</Typography> <br/>

      <Typography>Alternatively, if you would like to donate towards our life in Wanstead, please find our bank details below:</Typography> <br />
      <Typography>Jeremy Gaisie / Charlotte Brown </Typography>
      <Typography>Account number: 07930032 <CopySelection copyText="07930032" /></Typography>
      <Typography>Sort code: 608371 <CopySelection copyText="608371" /></Typography>
    </Paper>
  </Container>;

export default Registry;
