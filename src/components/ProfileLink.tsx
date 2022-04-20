import React from 'react';
import { Link, Typography } from '@mui/material';

export const ProfileLink = () => 
  <div style={{
    position: 'fixed',
    bottom: 0,
    left: 0,
    backgroundColor: 'orange',
    padding: '0.5rem',
    borderRadius: '0px  10px 0px 0px'
  }}>
    <Typography variant="body2" color="text.secondary">Coded by <Link href="https://github.com/remy90">Shaun</Link></Typography>
  </div>
;
