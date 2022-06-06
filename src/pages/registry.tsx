import type React from 'react';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import { List, ListItem, Paper, Typography } from '@mui/material';
import { CopySelection } from 'src/components/CopySelection';
import Image from 'next/image';
import {marginTop} from '../styles/sxConstants';

const Registry: NextPage = () => 
  <Container maxWidth="sm"><Typography variant="h2" sx={{marginTop}}>Wedding registry</Typography>
    <Paper sx={{p:'1rem', m: '1rem'}}>
      <Typography variant="h5">Our registry is shared between John Lewis, MADE and Etsy.</Typography><br />
      <Typography>If you select anything from MADE/Etsy, please inform us so that we can remove them from the list</Typography><br />
      <Typography variant="subtitle2">Click on the brand logos below to view registry items:</Typography>
      <List>
        <ListItem sx={{justifyContent: 'center'}}>
          <a target="_blank" href="https://www.johnlewis.com/wish-list/HTQFMTT" rel="noopener noreferrer">
            <Image src="/JohnLewis.svg" height={120} width={180} />
          </a>
        </ListItem>
        <ListItem sx={{justifyContent: 'center'}}>
          <a target="_blank" href="https://www.thingstogetme.com/397120a9a060" rel="noopener noreferrer">
            <Image src="/MadeLogo.svg" height={120} width={180} />
          </a>
        </ListItem>
        <ListItem sx={{justifyContent: 'center'}}>
          <a target="_blank" href="https://www.etsy.com/people/xmlcsxf2/favorites/wedding-registry?ref=cl_share_button" rel="noopener noreferrer">
            <Image style={{color: 'orange'}} src="/etsy.svg" height={120} width={180} />
          </a>
        </ListItem>
      </List>
      <Typography  sx={{textAlign: 'center', mb: '0.5rem'}} variant="h3">Gift address: <CopySelection copyText='Shaun and Charlotte, 33 Plough rise, RM14 1XR' /></Typography>
      { (new Date()) < (new Date(2022, 5, 28)) ? <><Typography sx={{textAlign: 'center'}}>Charlotte &amp; Shaun</Typography>  
        <Typography sx={{textAlign: 'center'}}>33 Plough rise</Typography>
        <Typography sx={{textAlign: 'center'}}>RM14 1XR</Typography> <br/></>
        : <><Typography sx={{textAlign: 'center'}}>Charlotte &amp; Shaun</Typography>  
          <Typography sx={{textAlign: 'center'}}>Flat 4, 19 Blake Hall Road</Typography>
          <Typography sx={{textAlign: 'center'}}>E11 2QQ</Typography> <br/></>}

      <Typography variant="h5">If you would like to give:</Typography> <br />
      <Typography sx={{textAlign: 'center'}}>Jeremy Gaisie / Charlotte Brown </Typography>
      <Typography sx={{textAlign: 'center'}}>Account number: 07930032<CopySelection copyText="07930032" /></Typography>
      <Typography sx={{textAlign: 'center'}}>Sort code: 60-83-71<CopySelection copyText="608371" /></Typography>
    </Paper>
  </Container>;

export default Registry;
