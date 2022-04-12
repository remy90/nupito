import React from 'react';
import { MenuItem, TextField } from '@mui/material';
import { IFieldProps } from '../Interfaces';

export const AttendanceField = ({ errors, onChange, register }: IFieldProps) =>
  <TextField
    select
    sx={{width: '100%'}}
    label="RSVP"
    defaultValue=""
    inputProps={register('isAttending', {
      required: 'Please select your attendance'
    })}
    onChange={onChange}
    error={!!errors}
    helperText={errors?.isAttending?.message}
  >
    <MenuItem onSelect={() => console.log('selected')} value={'true'}>I will attend</MenuItem>
    <MenuItem value={'false'}>I will not be able to attend</MenuItem>
  </TextField>;
