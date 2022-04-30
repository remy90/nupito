import type React from 'react';
import { Box, Input, Typography } from '@mui/material';
import type { IInputFieldProps } from '../Interfaces';
import type { LiteralUnion } from 'react-hook-form';

const getEmailValidationError = (errorType: LiteralUnion<string, string> | undefined) => {
  return <>
    {errorType === 'pattern' && (
      <Box sx={{width: '80%'}}>
        <Typography style={{
          fontSize: '0.75rem',
          fontWeight: 400,
          color: '#ff1744'
        }}>Please supply a valid email address for our wedding updates</Typography>
      </Box>)}
    {errorType === 'required' && (
      <Box sx={{width: '80%'}}>
        <Typography style={{
          fontSize: '0.75rem',
          fontWeight: 400,
          color: '#ff1744'
        }}>A valid email address is required</Typography>
      </Box>)}
  </>;
};
export const EmailFormField = ({ placeholder, errors, register }: IInputFieldProps) =>
  <Box sx={{marginTop: 2, marginBottom: 2, paddingLeft: 2}}>
    <Input
      sx={{ width: '90%', paddingLeft: 2, paddingRight: 2 }}
      placeholder={placeholder}
      {...register('emailAddress', {
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      }
      )}
      error={!!errors}
    />
    { getEmailValidationError(errors?.emailAddress?.type)}
  </Box>;