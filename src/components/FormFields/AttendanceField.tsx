import React from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import { IFieldProps } from '../Interfaces';

export const AttendanceField = ({ errors, onChange, register }: IFieldProps) =>
  <Box sx={{marginTop: '2rem', marginBottom: '2rem'}}>
    <TextField
      select
      sx={{width: '100%'}}
      label="RSVP"
      defaultValue=''
      inputProps={register('isAttending', { required: 'Please select your attendance', onChange })}
      error={!!errors?.isAttending}
      helperText={errors?.isAttending?.message}
    >
      <MenuItem key={'true'} value={1}>I will attend</MenuItem>
      <MenuItem key={'false'} value={0}>I will not be able to attend</MenuItem>
    </TextField>
  </Box>;
