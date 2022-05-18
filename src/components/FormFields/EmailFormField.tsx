import type React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import type { IEmailFormFieldProps } from '../Interfaces';
import { Controller, LiteralUnion } from 'react-hook-form';
import { FormFieldContainer } from './styled';

const getEmailValidationError = (errorType: LiteralUnion<string, string> | undefined) => {
  return <>
    {errorType === 'pattern' && (
      <Box sx={{width: '80%'}}>
        <Typography variant="subtitle1" style={{
          fontWeight: 400,
          color: '#ff1744'
        }}>Please supply a valid email address for our wedding updates</Typography>
      </Box>)}
    {errorType === 'required' && (
      <Box sx={{width: '80%'}}>
        <Typography variant="subtitle1" style={{
          fontWeight: 400,
          color: '#ff1744'
        }}>A valid email address is required</Typography>
      </Box>)}
  </>;
};
export const EmailFormField = ({ placeholder, errors, control, defaultValue, inputName }: IEmailFormFieldProps) =>
  <FormFieldContainer>
    <Controller
      name={inputName}
      control={control}
      defaultValue={defaultValue || ''}
      rules={{
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          fullWidth
          error={!!fieldState?.error}
          helperText={fieldState?.error?.message}
          label={placeholder}
        />
      )}
    />
    { getEmailValidationError(errors?.emailAddress?.type)}
  </ FormFieldContainer>;
