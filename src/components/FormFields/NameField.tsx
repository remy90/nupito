import React from 'react';
import { Box, Input, Typography } from '@mui/material';
import { IFieldProps } from '../Interfaces';
interface ITextFieldProps extends IFieldProps {
  inputName: 'firstName' | 'lastName';
  placeholder: string;
}
export const NameField = ({ inputName, placeholder, errors, register }: ITextFieldProps) =>
  <Box sx={{marginTop: 2, marginBottom: 2, paddingLeft: 2}}>
    <Input
      sx={{ width: '90%', paddingLeft: 2, paddingRight: 2 }}
      placeholder={placeholder}
      {...register(inputName)}
      error={!!errors}
    />
    { errors && errors[inputName]?.type === 'required' && (
      <Box sx={{width: '80%'}}>
        <Typography style={{
          fontSize: '0.75rem',
          fontWeight: 400,
          color: '#ff1744'
        }}>{placeholder} is a required field</Typography>
      </Box>
    )}
  </Box>;