import type React from 'react';
import { Link, Typography } from '@mui/material';

export const ProfileLink = () => 
  <Typography  sx={{
    backgroundColor: 'orange',
    padding: '0.5rem',
    width: '35%',
    borderRadius: '0px  10px 0px 0px'}} variant="body2" component="footer" color="text.secondary">Coded by <Link href="https://github.com/remy90">Shaun</Link></Typography>
;
