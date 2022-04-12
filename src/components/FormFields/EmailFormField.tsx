import React from 'react';
import { Box, Input, Typography } from '@mui/material';
import { IFieldProps } from '../Interfaces';

export const EmailFormField = ({ errors, register }: IFieldProps) =>
  <Box sx={{marginTop: 2, marginBottom: 2, paddingLeft: 2}}>
    <Input
      sx={{ width: '90%', paddingLeft: 2, paddingRight: 2 }}
      placeholder='Email address'
      {...register('emailAddress', {
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      }
      )}
      error={!!errors}
    />
    { errors?.emailAddress?.type === 'pattern' && (
      <div style={{width: '80%'}}>
        <Typography style={{
          fontSize: '0.75rem',
          fontWeight: 400,
          color: '#ff1744'
        }}>Please supply a valid email address for our wedding updates</Typography>
      </div>
    )}
  </Box>;