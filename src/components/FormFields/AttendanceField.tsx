import React from 'react';
import { MenuItem, TextField } from '@mui/material';
import { IFieldProps } from '../Interfaces';
import { FormFieldContainer } from './styled';

export const AttendanceField = ({ errors, onChange, register, defaultValue = '' }: IFieldProps) =>
  (<FormFieldContainer>
    <TextField
      select
      sx={{width: '100%'}}
      label="RSVP"
      defaultValue={defaultValue}
      inputProps={register('isAttending', { required: 'Please select your attendance', onChange })}
      error={!!errors?.isAttending}
      helperText={errors?.isAttending?.message}
    >
      <MenuItem key={'true'} value={1}>I will attend</MenuItem>
      <MenuItem key={'false'} value={0}>I will not be able to attend</MenuItem>
    </TextField>
  </FormFieldContainer>);
