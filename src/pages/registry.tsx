import type React from 'react';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import { List, ListItem, Paper, Typography } from '@mui/material';

const Registry: NextPage = () => 
  <Container maxWidth="sm"><Typography variant="h3">Wedding registry</Typography>
    <Paper sx={{p:'1rem', m: '1rem'}}>
      <List dense={true} sx={{ listStyleType: 'disc' }}>
        <ListItem sx={{ display: 'list-item' }}>
          <a href="https://www.johnlewis.com/wish-list/HTQFMTT">John Lewis</a>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <a href="https://www.thingstogetme.com/397120a9a060">Made</a>
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <a href="https://www.etsy.com/people/xmlcsxf2/favorites/wedding-registry?ref=cl_share_button">Etsy</a>
        </ListItem>
      </List>
      <Typography variant="h5" sx={{mb: '0.5rem'}}>Gift address:</Typography>
      <Typography>Shaun &amp; Charlotte</Typography>  
      <Typography>33 Plough rise</Typography>
      <Typography>RM14 1XR</Typography> <br/>

      <Typography>Alternatively, if you would like to donate towards our life in Wanstead, please find our bank details below:</Typography> <br />
      <Typography>Jeremy Gaisie </Typography>
      <Typography>07930032</Typography>
      <Typography>608371</Typography>
    </Paper>
  </Container>;

export default Registry;
