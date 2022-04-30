import type React from 'react';
import { Box, Input } from '@mui/material';
import type { IInputFieldProps } from '../Interfaces';


export const InputField = ({ inputName, placeholder, errors, register }: IInputFieldProps) =>
  <Box sx={{marginTop: 2, marginBottom: 2, paddingLeft: 2}}>
    <Input
      sx={{ width: '90%', paddingLeft: 2, paddingRight: 2 }}
      placeholder={placeholder}
      {...register(inputName)}
      error={!!errors}
    />
  </Box>;