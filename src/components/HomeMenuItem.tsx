import React from 'react';
import { Typography } from '@mui/material';
import Link from 'src/Link';

export const HomeMenuItem = ({Href, NavTitle, ...additionalSx}: ({Href: string, NavTitle: string})) =>{
  return (
    <Link href={Href} color="secondary">
      <Typography variant='h2' sx={{ 
        m: '0.8rem',
        whiteSpace: 'pre-wrap',
        color: '#13655d',
        ...additionalSx 
      }}>
        {NavTitle}
      </Typography>
    </Link>);};
