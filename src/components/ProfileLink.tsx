import type React from 'react';
import { Link, Typography } from '@mui/material';

export const ProfileLink = () => 
  <Typography  sx={{
    backgroundColor: '#B9A181',
    padding: '0.5rem',
    width: '35%',
    borderRadius: '0px  10px 0px 0px'}} variant="body2" component="footer" color="text.secondary">Coded by <Link href="mailto:jsgaisie@outlook.com?subject=Website%20projects%20and%20assistance">Shaun</Link></Typography>
;
